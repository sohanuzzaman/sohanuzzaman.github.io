import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackgroundElements from './BackgroundElements';

const TermsOfService: React.FC = () => {
  return (
    <>
      <BackgroundElements />
      <Header />
      <main className="legal-page">
        <div className="container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p>Last updated: January 1, 2025</p>
        </div>

        <div className="legal-content">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Mohan Solutions ("we," "us," or "our"), 
              you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Services Description</h2>
            <p>
              Mohan Solutions provides digital strategy and automation services including but not limited to:
            </p>
            <ul>
              <li>Business process automation</li>
              <li>Digital strategy consulting</li>
              <li>System integration services</li>
              <li>Technical implementation and support</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information necessary for service delivery</li>
              <li>Respond to requests for information in a timely manner</li>
              <li>Pay all fees as outlined in the service agreement</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Payment Terms</h2>
            <p>
              Payment terms will be specified in individual service agreements. 
              Generally, payments are due within 30 days of invoice date unless otherwise specified.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>
              All custom work performed by Mohan Solutions becomes the property of the client upon full payment, 
              unless otherwise specified in the service agreement. Pre-existing intellectual property remains 
              the property of Mohan Solutions.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Confidentiality</h2>
            <p>
              We maintain strict confidentiality regarding all client information and business processes. 
              Client information will not be shared with third parties without explicit consent.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              Mohan Solutions' liability is limited to the amount paid for services. We are not liable 
              for indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Termination</h2>
            <p>
              Either party may terminate services with 30 days written notice. 
              All work completed up to the termination date will be billed according to the agreed terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction where Mohan Solutions operates. 
              Any disputes will be resolved through binding arbitration.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. 
              Clients will be notified of material changes via email or through our website.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:contact@sohanuzzaman.com">contact@sohanuzzaman.com</a>
            </p>
          </div>
        </div>

        <div className="legal-footer">
          <p>
            By using our services, you acknowledge that you have read and understood these Terms of Service 
            and agree to be bound by them.
          </p>
        </div>

        <div className="legal-actions">
          <Link to="/" className="button button-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default TermsOfService;
