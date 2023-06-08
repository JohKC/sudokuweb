import PropTypes from "prop-types";

const Box = ({ children }) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        color: "black",
        background: "#433e3f",
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(3, 1fr)",
      }}>
      {children}
    </div>
  );
};

export default Box;

Box.propTypes = {
  children: PropTypes.node.isRequired,
};
