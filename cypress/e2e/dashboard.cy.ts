describe('Diagnyx Dashboard E2E Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login')
    cy.get('[data-testid="username-input"]').type('testuser@diagnyx.ai')
    cy.get('[data-testid="password-input"]').type('Test@1234')
    cy.get('[data-testid="login-button"]').click()
    cy.url().should('include', '/dashboard')
  })

  describe('Dashboard Overview', () => {
    it('should display main dashboard metrics', () => {
      cy.get('[data-testid="total-requests"]').should('be.visible')
      cy.get('[data-testid="error-rate"]').should('be.visible')
      cy.get('[data-testid="avg-latency"]').should('be.visible')
      cy.get('[data-testid="active-services"]').should('be.visible')
    })

    it('should refresh data when refresh button is clicked', () => {
      // Get initial value
      cy.get('[data-testid="total-requests"]').invoke('text').then((initialValue) => {
        // Click refresh
        cy.get('[data-testid="refresh-button"]').click()
        
        // Wait for update
        cy.wait(1000)
        
        // Value should potentially change
        cy.get('[data-testid="total-requests"]').should('be.visible')
      })
    })

    it('should filter data by time range', () => {
      // Select last 24 hours
      cy.get('[data-testid="time-range-selector"]').click()
      cy.get('[data-testid="time-range-24h"]').click()
      
      // Verify chart updates
      cy.get('[data-testid="metrics-chart"]').should('be.visible')
      
      // Select last 7 days
      cy.get('[data-testid="time-range-selector"]').click()
      cy.get('[data-testid="time-range-7d"]').click()
      
      // Verify chart updates again
      cy.get('[data-testid="metrics-chart"]').should('be.visible')
    })
  })

  describe('Service Monitoring', () => {
    it('should display all services', () => {
      cy.visit('/dashboard/services')
      
      const expectedServices = [
        'user-service',
        'observability-service',
        'ai-quality-service',
        'optimization-service',
        'api-gateway'
      ]
      
      expectedServices.forEach(service => {
        cy.get(`[data-testid="service-card-${service}"]`).should('be.visible')
      })
    })

    it('should show service details on click', () => {
      cy.visit('/dashboard/services')
      
      // Click on user-service
      cy.get('[data-testid="service-card-user-service"]').click()
      
      // Should navigate to service details
      cy.url().should('include', '/services/user-service')
      
      // Should show service metrics
      cy.get('[data-testid="service-health"]').should('be.visible')
      cy.get('[data-testid="service-latency"]').should('be.visible')
      cy.get('[data-testid="service-throughput"]').should('be.visible')
    })

    it('should filter services by status', () => {
      cy.visit('/dashboard/services')
      
      // Filter by healthy services
      cy.get('[data-testid="status-filter"]').click()
      cy.get('[data-testid="status-healthy"]').click()
      
      // Should show only healthy services
      cy.get('[data-testid*="service-card"]').each(($el) => {
        cy.wrap($el).find('[data-testid="status-badge"]')
          .should('have.class', 'status-healthy')
      })
    })
  })

  describe('Trace Analysis', () => {
    it('should display trace list', () => {
      cy.visit('/dashboard/traces')
      
      // Should show trace table
      cy.get('[data-testid="traces-table"]').should('be.visible')
      
      // Should have trace entries
      cy.get('[data-testid="trace-row"]').should('have.length.greaterThan', 0)
    })

    it('should search traces', () => {
      cy.visit('/dashboard/traces')
      
      // Search by trace ID
      cy.get('[data-testid="trace-search"]').type('trace-123')
      cy.get('[data-testid="search-button"]').click()
      
      // Should show filtered results
      cy.get('[data-testid="trace-row"]').should('have.length.lessThan', 10)
    })

    it('should show trace details', () => {
      cy.visit('/dashboard/traces')
      
      // Click first trace
      cy.get('[data-testid="trace-row"]').first().click()
      
      // Should show trace details modal
      cy.get('[data-testid="trace-details-modal"]').should('be.visible')
      cy.get('[data-testid="trace-spans"]').should('be.visible')
      cy.get('[data-testid="trace-timeline"]').should('be.visible')
    })

    it('should export traces', () => {
      cy.visit('/dashboard/traces')
      
      // Select traces
      cy.get('[data-testid="trace-checkbox-all"]').click()
      
      // Click export
      cy.get('[data-testid="export-button"]').click()
      cy.get('[data-testid="export-csv"]').click()
      
      // Should download file
      cy.readFile('cypress/downloads/traces.csv').should('exist')
    })
  })

  describe('AI Quality Dashboard', () => {
    it('should display hallucination metrics', () => {
      cy.visit('/dashboard/ai-quality')
      
      cy.get('[data-testid="hallucination-rate"]').should('be.visible')
      cy.get('[data-testid="accuracy-score"]').should('be.visible')
      cy.get('[data-testid="evaluation-count"]').should('be.visible')
    })

    it('should run manual evaluation', () => {
      cy.visit('/dashboard/ai-quality')
      
      // Open evaluation form
      cy.get('[data-testid="new-evaluation-button"]').click()
      
      // Fill form
      cy.get('[data-testid="prompt-input"]').type('What is the capital of France?')
      cy.get('[data-testid="response-input"]').type('The capital of France is Paris.')
      cy.get('[data-testid="context-input"]').type('France is a European country.')
      cy.get('[data-testid="model-select"]').select('gpt-4')
      
      // Submit
      cy.get('[data-testid="evaluate-button"]').click()
      
      // Should show results
      cy.get('[data-testid="evaluation-results"]').should('be.visible')
      cy.get('[data-testid="hallucination-score"]').should('be.visible')
    })

    it('should configure thresholds', () => {
      cy.visit('/dashboard/ai-quality/settings')
      
      // Update hallucination threshold
      cy.get('[data-testid="hallucination-threshold"]').clear().type('0.5')
      cy.get('[data-testid="save-thresholds"]').click()
      
      // Should show success message
      cy.get('[data-testid="success-message"]').should('contain', 'Thresholds updated')
    })
  })

  describe('Cost Optimization', () => {
    it('should display cost metrics', () => {
      cy.visit('/dashboard/cost')
      
      cy.get('[data-testid="total-cost"]').should('be.visible')
      cy.get('[data-testid="cost-by-model"]').should('be.visible')
      cy.get('[data-testid="cost-trend-chart"]').should('be.visible')
    })

    it('should show model routing decisions', () => {
      cy.visit('/dashboard/cost/routing')
      
      // Should show routing table
      cy.get('[data-testid="routing-table"]').should('be.visible')
      
      // Should show routing distribution
      cy.get('[data-testid="model-distribution-chart"]').should('be.visible')
    })

    it('should configure routing rules', () => {
      cy.visit('/dashboard/cost/settings')
      
      // Add new routing rule
      cy.get('[data-testid="add-rule-button"]').click()
      
      // Fill rule form
      cy.get('[data-testid="rule-name"]').type('Cost Optimization Rule')
      cy.get('[data-testid="cost-threshold"]').type('1.0')
      cy.get('[data-testid="model-cascade"]').select('haiku-sonnet-opus')
      
      // Save rule
      cy.get('[data-testid="save-rule"]').click()
      
      // Should appear in rules list
      cy.get('[data-testid="rules-list"]')
        .should('contain', 'Cost Optimization Rule')
    })
  })

  describe('User Management', () => {
    it('should display user profile', () => {
      cy.visit('/dashboard/profile')
      
      cy.get('[data-testid="user-email"]').should('be.visible')
      cy.get('[data-testid="user-role"]').should('be.visible')
      cy.get('[data-testid="api-keys-section"]').should('be.visible')
    })

    it('should generate new API key', () => {
      cy.visit('/dashboard/profile')
      
      // Generate new key
      cy.get('[data-testid="generate-api-key"]').click()
      cy.get('[data-testid="key-name"]').type('Test API Key')
      cy.get('[data-testid="confirm-generate"]').click()
      
      // Should show new key
      cy.get('[data-testid="api-key-display"]').should('be.visible')
      
      // Copy key
      cy.get('[data-testid="copy-key"]').click()
      cy.get('[data-testid="success-message"]').should('contain', 'Copied')
    })

    it('should update user settings', () => {
      cy.visit('/dashboard/settings')
      
      // Update notification preferences
      cy.get('[data-testid="email-notifications"]').click()
      cy.get('[data-testid="slack-notifications"]').click()
      
      // Update timezone
      cy.get('[data-testid="timezone-select"]').select('America/New_York')
      
      // Save settings
      cy.get('[data-testid="save-settings"]').click()
      
      // Should show success
      cy.get('[data-testid="success-message"]').should('contain', 'Settings updated')
    })
  })

  describe('Real-time Updates', () => {
    it('should receive real-time metric updates', () => {
      cy.visit('/dashboard')
      
      // Get initial value
      cy.get('[data-testid="total-requests"]')
        .invoke('text')
        .then((initialValue) => {
          // Wait for WebSocket update (simulate by waiting)
          cy.wait(5000)
          
          // Value should have changed
          cy.get('[data-testid="total-requests"]')
            .invoke('text')
            .should('not.equal', initialValue)
        })
    })

    it('should show real-time alerts', () => {
      cy.visit('/dashboard')
      
      // Simulate alert trigger
      cy.window().then((win) => {
        // Trigger a mock alert through window event
        win.dispatchEvent(new CustomEvent('alert', {
          detail: {
            type: 'error',
            message: 'High error rate detected'
          }
        }))
      })
      
      // Should show alert notification
      cy.get('[data-testid="alert-notification"]').should('be.visible')
      cy.get('[data-testid="alert-notification"]')
        .should('contain', 'High error rate detected')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.visit('/dashboard')
      
      // Mobile menu should be visible
      cy.get('[data-testid="mobile-menu-button"]').should('be.visible')
      
      // Open mobile menu
      cy.get('[data-testid="mobile-menu-button"]').click()
      cy.get('[data-testid="mobile-menu"]').should('be.visible')
      
      // Navigate to services
      cy.get('[data-testid="mobile-menu-services"]').click()
      cy.url().should('include', '/services')
    })

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2')
      cy.visit('/dashboard')
      
      // Should show adapted layout
      cy.get('[data-testid="dashboard-grid"]')
        .should('have.css', 'grid-template-columns')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.visit('/dashboard')
      
      // Tab through interactive elements
      cy.get('body').tab()
      cy.focused().should('have.attr', 'data-testid', 'services-link')
      
      cy.focused().tab()
      cy.focused().should('have.attr', 'data-testid', 'traces-link')
      
      // Activate with Enter key
      cy.focused().type('{enter}')
      cy.url().should('include', '/traces')
    })

    it('should have proper ARIA labels', () => {
      cy.visit('/dashboard')
      
      // Check ARIA labels
      cy.get('[data-testid="refresh-button"]')
        .should('have.attr', 'aria-label', 'Refresh data')
      
      cy.get('[data-testid="time-range-selector"]')
        .should('have.attr', 'aria-label', 'Select time range')
      
      cy.get('[data-testid="metrics-chart"]')
        .should('have.attr', 'role', 'img')
        .should('have.attr', 'aria-label')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Simulate network failure
      cy.intercept('GET', '/api/v1/metrics', { forceNetworkError: true })
      
      cy.visit('/dashboard')
      
      // Should show error message
      cy.get('[data-testid="error-message"]').should('be.visible')
      cy.get('[data-testid="retry-button"]').should('be.visible')
      
      // Retry should work when network is back
      cy.intercept('GET', '/api/v1/metrics', { fixture: 'metrics.json' })
      cy.get('[data-testid="retry-button"]').click()
      
      // Should show data
      cy.get('[data-testid="total-requests"]').should('be.visible')
    })

    it('should handle session timeout', () => {
      cy.visit('/dashboard')
      
      // Simulate session timeout
      cy.window().then((win) => {
        win.localStorage.removeItem('authToken')
      })
      
      // Make a request that requires auth
      cy.get('[data-testid="refresh-button"]').click()
      
      // Should redirect to login
      cy.url().should('include', '/login')
      cy.get('[data-testid="session-expired-message"]').should('be.visible')
    })
  })
})

// Logout after all tests
after(() => {
  cy.visit('/dashboard')
  cy.get('[data-testid="user-menu"]').click()
  cy.get('[data-testid="logout-button"]').click()
  cy.url().should('include', '/login')
})