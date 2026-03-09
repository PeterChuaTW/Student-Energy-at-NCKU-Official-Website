import { useTranslation } from "react-i18next";

const demoEvents = [
  {
    title: "Energy Transition Workshop",
    date: "April 2026",
    description: "Hands-on sessions on renewable energy policy, climate finance, and local innovation.",
  },
  {
    title: "Industry Networking Night",
    date: "May 2026",
    description: "Meet professionals from energy startups, utilities, and sustainability teams.",
  },
  {
    title: "Student Project Showcase",
    date: "June 2026",
    description: "NCKU students present practical projects for decarbonization and community impact.",
  },
];

function Events() {
  const { t } = useTranslation();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.title}>{t("events.title")}</h1>
        <p style={styles.subtitle}>{t("events.subtitle")}</p>

        <div style={styles.grid}>
          {demoEvents.map((event) => (
            <article key={event.title} style={styles.card}>
              <p style={styles.date}>{event.date}</p>
              <h2 style={styles.cardTitle}>{event.title}</h2>
              <p style={styles.description}>{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "7.5rem 1.25rem 4rem",
    background: "#f8fafc",
    minHeight: "70vh",
  },
  container: {
    margin: "0 auto",
    maxWidth: "1024px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "0.75rem",
    marginBottom: "2rem",
    color: "#475569",
    maxWidth: "760px",
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "1.1rem",
  },
  date: {
    margin: 0,
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#16a34a",
  },
  cardTitle: {
    marginTop: "0.6rem",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    color: "#0f172a",
  },
  description: {
    margin: 0,
    color: "#334155",
    lineHeight: 1.7,
  },
};

export default Events;
