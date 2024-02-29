export default function Footer({ lightMode }) {
  return (
    <div
      className="mt-5 footer"
      style={{ backgroundColor: lightMode ? "#E4E3E0" : "#313638" }}
    >
      <div className="p-5">
        <p className="footerText">
          @2024. Group 9 STEM BECQUEREL. All Rights Reserved.
        </p>
        <p className="footerText">
          Illustration by{" "}
          <a href="https://icons8.com/illustrations/author/N3YOxdn12Kox">
            Marina Mogulska
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div>
    </div>
  );
}
