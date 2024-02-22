export default function Button({
  name,
  onClick,
  type,
  icon,
  href,
  color,
  className,
  paddingLeft,
}) {
  // let buttonColor;
  // if (icon) {
  //   const trashIcon = <i className="fa-solid fa-trash"></i>;
  //   const penIcon = <i className="fa-solid fa-pen-to-square"></i>;

  //   if (icon.props.className === trashIcon.props.className) {
  //     buttonColor = "btn-success"; // Change background color to red for fa-trash icon
  //   } else if (icon.props.className === penIcon.props.className) {
  //     buttonColor = "btn-danger"; // Change background color to yellow for fa-pen-to-square icon
  //   } else {
  //     buttonColor = "btn-primary"; // Default background color if neither fa-trash nor fa-pen-to-square
  //   }
  // } else {
  //   buttonColor = "btn-primary"; // Default background color if icon is not provided
  // }

  return (
    <div className="">
      <button
        className={`btn ${color} ${className}`}
        onClick={onClick}
        type={type}
        style={{ borderRadius: "200px", paddingLeft: { paddingLeft } }}
      >
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href={href}
        >
          {name ? name : icon}
        </a>
      </button>
    </div>
  );
}
