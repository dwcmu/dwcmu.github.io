const cardStyle = {};

function Card({ index }) {
  let imageLink = "AN_Cards_E_Front_Low";
  index += 1;
  if (index > 138) {
    imageLink = imageLink.concat(
      "2-",
      String(index - 138).padStart(3, "0"),
      ".png"
    );
  } else {
    imageLink = imageLink.concat("1-", String(index).padStart(3, "0"), ".png");
  }
  return (
    <div style={cardStyle}>
      <img src={imageLink} alt="card" height={280} width={200} />
    </div>
  );
}

export default Card;
