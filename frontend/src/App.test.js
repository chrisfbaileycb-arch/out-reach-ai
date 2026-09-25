import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import DynamicDashboard from './components/DynamicDashboard';
import { BUSINESS_TYPES } from './utils/businessTypes';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  interceptors: { response: { use: vi.fn(() => 1), eject: vi.fn() } },
}));
vi.mock('./utils/api', async (importOriginal) => ({
  ...(await importOriginal()),
  default: api,
  setAuthToken: vi.fn(),
}));

const USER = { id: '1', firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' };
const httpError = (status, message) => Object.assign(new Error(message), { response: { status, data: { message } } });

const signedIn = (businessType) => {
  localStorage.setItem('token', 'stored-token');
  localStorage.setItem('user', JSON.stringify(USER));
  if (businessType) localStorage.setItem('businessType', businessType);
  api.get.mockResolvedValue({ data: USER });
};

const renderApp = (path = '/') => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DynamicDashboard', () => {
  test.each(BUSINESS_TYPES)('$id renders its title, stats and non-empty activity', (type) => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DynamicDashboard businessType={type} />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`${type.dashboardTitle} Dashboard`);
    type.statLabels.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
    const activity = screen.getAllByRole('listitem');
    expect(activity.map((row) => row.textContent)).toEqual(
      type.recentActivity.map((text) => expect.stringContaining(text))
    );
    type.quickActions.forEach(({ label, path }) =>
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', path)
    );
  });
});

describe('signed out', () => {
  test('landing page links to sign up and sign in', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fill Your Business With Local Customers');
    expect(screen.getByRole('link', { name: 'Get Started Free' })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/login');
    BUSINESS_TYPES.forEach(({ name }) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  test('protected pages redirect to sign in', () => {
    renderApp('/dashboard');
    expect(screen.getByRole('heading', { name: 'Sign In to LocalBoost' })).toBeInTheDocument();
  });

  test('register leads to business type selection, then the dashboard', async () => {
    const user = userEvent.setup();
    api.post.mockResolvedValue({ data: { token: 'new-token', user: USER } });
    renderApp('/register');

    await user.type(screen.getByLabelText(/first name/i), 'Ada');
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/password/i), 'longenough');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(api.post).toHaveBeenCalledWith('/api/auth/register', {
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      password: 'longenough',
    });
    expect(await screen.findByRole('heading', { name: /what type of business/i })).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('new-token');

    await user.click(screen.getByText('Pet Services'));
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Pet Services Dashboard');
  });

  test('failed sign in shows the server message', async () => {
    const user = userEvent.setup();
    api.post.mockRejectedValue(httpError(400, 'Invalid credentials'));
    renderApp('/login');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass1');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('signing in returns to the page that was requested', async () => {
    const user = userEvent.setup();
    api.post.mockResolvedValue({ data: { token: 't', user: USER } });
    renderApp('/analytics');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/password/i), 'longenough');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('heading', { name: 'Analytics' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/analytics');
  });
});

describe('signed in', () => {
  test('a stored session goes straight to the dashboard', async () => {
    signedIn('home');
    renderApp('/');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Home Services Dashboard');
    expect(api.get).toHaveBeenCalledWith('/api/auth');
  });

  test('without a business type, the dashboard asks for one', async () => {
    signedIn();
    renderApp('/dashboard');
    expect(await screen.findByRole('heading', { name: /what type of business/i })).toBeInTheDocument();
  });

  test('an expired stored session signs the user out', async () => {
    signedIn('home');
    api.get.mockRejectedValue(httpError(401, 'Session expired'));
    renderApp('/dashboard');
    expect(await screen.findByRole('heading', { name: 'Sign In to LocalBoost' })).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('a server outage does not sign the user out', async () => {
    signedIn('home');
    api.get.mockRejectedValue(new Error('Network Error'));
    renderApp('/dashboard');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Home Services Dashboard');
    expect(localStorage.getItem('token')).toBe('stored-token');
  });

  test('change business type preselects the current one', async () => {
    const user = userEvent.setup();
    signedIn('food');
    renderApp('/dashboard');
    await user.click(await screen.findByRole('button', { name: 'Open menu' }));
    const item = screen.getByRole('menuitem', { name: /change business type/i });
    expect(within(item).getByText('Currently: Food & Dining')).toBeInTheDocument();
    await user.click(item);
    expect(screen.getByRole('radio', { name: 'Food & Dining' })).toBeChecked();
  });

  test('log out clears the session and business type', async () => {
    const user = userEvent.setup();
    signedIn('food');
    renderApp('/dashboard');
    await user.click(await screen.findByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('menuitem', { name: /log out/i }));
    expect(await screen.findByRole('heading', { name: 'Sign In to LocalBoost' })).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('businessType')).toBeNull();
  });
});
