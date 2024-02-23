export default function Footer({ lightMode }) {
  return (
    <div
      className="mt-5 footer"
      style={{ backgroundColor: lightMode ? "#E4E3E0" : "#313638" }}
    >
      <div className="p-5">
        <p className="footerText">
          @2024. Group 9&trade;. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
