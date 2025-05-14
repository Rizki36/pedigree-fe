import { Link } from "@tanstack/react-router";

const PrivacyPolicy = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/login"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Login
      </Link>

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to the Pedigree Tracking Application. We respect your
            privacy and are committed to protecting the personal and animal data
            you share with us. This Privacy Policy explains how we collect, use,
            and safeguard information when you use our animal pedigree tracking
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="mb-2">
            In order to provide our pedigree tracking services, we collect and
            process the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>User Information:</strong> Name, email address, and
              authentication details when you create an account.
            </li>
            <li>
              <strong>Animal Information:</strong> Details about animals you
              register, including identification codes, names, gender, date of
              birth, date of death, and species/breed.
            </li>
            <li>
              <strong>Pedigree Data:</strong> Lineage information, genetic
              relationships, and breeding history.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              application, including actions performed and features accessed.
            </li>
            <li>
              <strong>Device Information:</strong> Information about the device
              and browser you use to access our service.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              To create and maintain your account and provide our pedigree
              tracking services.
            </li>
            <li>
              To build and maintain accurate pedigree records and genetic
              histories for registered animals.
            </li>
            <li>To improve and optimize our application and services.</li>
            <li>
              To communicate with you about your account, animals, and relevant
              updates.
            </li>
            <li>To ensure the security and integrity of our platform.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information or animal data. We may
            share information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              With other users according to your privacy settings (for
              collaborative breeding or pedigree research).
            </li>
            <li>
              With service providers who assist us in operating our platform
              (data storage, analytics, etc.).
            </li>
            <li>When required by law or to protect our rights.</li>
            <li>
              In the event of a merger, acquisition, or asset sale, in which
              case we will notify you of any ownership change.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your information from unauthorized access, loss, or
            alteration. However, no internet transmission is 100% secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Your Rights and Choices
          </h2>
          <p className="mb-2">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Access, correct, or delete your personal information and animal
              data.
            </li>
            <li>Restrict or object to certain processing activities.</li>
            <li>
              Data portability (receive your data in a structured,
              machine-readable format).
            </li>
            <li>Withdraw consent for optional processing at any time.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us using the information
            provided at the end of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Retention of Information
          </h2>
          <p>
            We retain your information for as long as necessary to provide our
            services, comply with legal obligations, resolve disputes, and
            enforce our agreements. For pedigree data, we maintain historical
            records to preserve the integrity of genetic lineage tracking, which
            is essential for the purpose of our application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 16. We do not
            knowingly collect personal information from children. If you believe
            a child has provided us with personal information, please contact us
            to have it removed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. We will notify you of
            significant changes through the application or by email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or our data practices, please contact us at:
          </p>
          <p className="mt-2">
            Pedigree Tracking Support
            <br />
            Email: adm.pedigree@gmail.com
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">Last updated: May 14, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
