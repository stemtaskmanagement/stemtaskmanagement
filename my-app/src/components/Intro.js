import React from "react";

export default function Intro({ lightMode }) {
  return (
    <div>
      <h1
        style={{ fontSize: "65px", fontWeight: "bold" }}
        className="text-primary wow animate__animated animate__fadeIn"
      >
        FAQs - STEMTask
      </h1>

      <h3>1. What is STEMTask?</h3>
      <p>
        STEMTask is a task management web application designed specifically for
        Grade 11 STEM students. It helps students organize, prioritize, and
        track their academic tasks efficiently. STEMTask is a project conceived
        and developed by Group 9 of Grade 12 STEM students as part of their
        capstone project. This innovative task management web application is the
        culmination of their academic journey, reflecting their dedication,
        creativity, and problem-solving skills.
      </p>

      <h3>2. How does STEMTask benefit Grade 11 STEM students?</h3>
      <p>
        STEMTask streamlines the task management process, allowing students to
        stay organized, manage their workload effectively, and achieve academic
        success. It helps students prioritize tasks, set deadlines, and track
        progress, ultimately reducing stress and enhancing productivity.
      </p>

      <h3>3. What features does STEMTask offer?</h3>
      <p>
        STEMTask offers a range of features tailored to the needs of Grade 11
        STEM students, including task organization, deadline setting,
        categorization by subject, and progress tracking.
      </p>

      <h3>4. Is STEMTask easy to use?</h3>
      <p>
        Yes, STEMTask is designed with a user-friendly interface, making it
        intuitive and easy to navigate. Students can quickly learn how to use
        the platform and start managing their tasks efficiently.
      </p>

      <h3>5. Can I access STEMTask on different devices?</h3>
      <p>
        Yes, STEMTask is a web-based application, meaning you can access it from
        any device with an internet connection, including computers, laptops,
        tablets, and smartphones.
      </p>

      <h3>6. Is STEMTask secure?</h3>
      <p>
        Yes, STEMTask prioritizes the security and privacy of its users. The
        platform employs industry-standard security measures to protect user
        data and ensure a safe browsing experience.
      </p>

      <h3>7. Can I customize STEMTask to fit my needs?</h3>
      <p>
        While STEMTask is specifically tailored for Grade 11 STEM students,
        users can customize certain features such as task categories, label
        colors, and deadlines to suit their individual preferences and
        requirements.
      </p>

      <h3>8. Is STEMTask free to use?</h3>
      <p>STEMTask offers a free version for all of its users.</p>

      <h3>9. How can I get started with STEMTask?</h3>
      <p>
        Getting started with STEMTask is easy. Simply sign up for an account on
        the website, and you'll be guided through the setup process. Once logged
        in, you can start adding tasks, setting deadlines, and organizing your
        academic workload right away.
      </p>

      <h3>10. Is there customer support available for STEMTask users?</h3>
      <p>
        Yes, STEMTask provides customer support to assist users with any
        questions, concerns, or technical issues they may encounter. Users can
        reach out via{" "}
        <a href="mailto:stemtaskmanagement@gmail.com">
          stemtaskmanagement@gmail.com
        </a>
        <h3>11. How is my data protected on STEMTask?</h3>
        <p>
          Protecting your privacy and data security is a top priority for us. We
          take several measures to ensure the confidentiality and integrity of
          your data:
        </p>
        <ul>
          <li>
            <strong>Access Controls:</strong> Your data is accessed only by
            authorized personnel who need it for legitimate purposes, such as
            improving and maintaining the service. We strictly control access
            and adhere to comprehensive security protocols to prevent
            unauthorized access or misuse.
          </li>
          <li>
            <strong>Confidentiality:</strong> We treat your data with the utmost
            confidentiality and respect. Your information is stored securely and
            is never shared with third parties without your consent, except as
            required by law or outlined in our Privacy Policy.
          </li>
          <li>
            <strong>Transparency:</strong> We are committed to transparency in
            our data handling practices. We clearly communicate how your data is
            collected, used, and protected, and we provide avenues for you to
            review and manage your data preferences.
          </li>
        </ul>
        <p>
          Additionally, developers working on STEMTask have access to users'
          task data solely for the purpose of improving and maintaining the
          service. This access is tightly controlled and subject to rigorous
          security measures to safeguard your data. We are dedicated to
          respecting your privacy and maintaining your trust. If you have any
          questions or concerns about your data privacy, please don't hesitate
          to contact us at{" "}
          <a href="mailto:stemtaskmanagement@gmail.com">
            stemtaskmanagement@gmail.com
          </a>
        </p>
      </p>
    </div>
  );
}
