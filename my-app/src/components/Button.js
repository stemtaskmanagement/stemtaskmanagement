export default function Button({
  name,
  onClick,
  type,
  icon,
  href,
  color,
  className,
  paddingLeft,
  link,
}) {
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
          href={href || link}
          target={link ? "_blank" : "_self"}
        >
          {name ? name : icon}
        </a>
      </button>
    </div>
  );
}
