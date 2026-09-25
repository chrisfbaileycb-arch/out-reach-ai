import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import DynamicDashboard from './components/DynamicDashboard';
import { BUSINESS_TYPES } from './utils/businessTypes';

const renderApp = (path = '/') => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

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

describe('onboarding flow', () => {
  test('/dashboard without a chosen type redirects to the picker', () => {
    renderApp('/dashboard');
    expect(screen.getByRole('heading', { name: /what type of business/i })).toBeInTheDocument();
  });

  test('choosing a type shows its dashboard and remembers the choice', async () => {
    const user = userEvent.setup();
    renderApp('/');
    const continueButton = screen.getByRole('button', { name: 'Continue' });
    expect(continueButton).toBeDisabled();

    await user.click(screen.getByText('Pet Services'));
    await user.click(continueButton);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Pet Services Dashboard');
    expect(localStorage.getItem('businessType')).toBe('pets');
  });

  test('returning to the picker preselects the saved type', () => {
    localStorage.setItem('businessType', 'home');
    renderApp('/');
    expect(screen.getByRole('radio', { name: 'Home Services' })).toBeChecked();
  });

  test('change business type is reachable from the menu', async () => {
    const user = userEvent.setup();
    localStorage.setItem('businessType', 'food');
    renderApp('/dashboard');
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const item = screen.getByRole('menuitem', { name: /change business type/i });
    expect(within(item).getByText('Currently: Food & Dining')).toBeInTheDocument();
    await user.click(item);
    expect(screen.getByRole('radio', { name: 'Food & Dining' })).toBeChecked();
  });
});
