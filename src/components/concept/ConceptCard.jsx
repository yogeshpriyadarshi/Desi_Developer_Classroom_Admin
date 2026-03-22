function ConceptCard({ concept }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{concept.name}</h3>
      <p>{concept.description}</p>
      <p>Status: {concept.status}</p>
      <p>Premium: {concept.isPremium ? "Yes" : "No"}</p>
    </div>
  );
}

export default ConceptCard;
