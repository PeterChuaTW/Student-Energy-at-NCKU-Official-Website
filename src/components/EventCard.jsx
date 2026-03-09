import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CARD_BG = "#1a4d2e";
const TEXT_PRIMARY = "#f3f4f6";
const TEXT_SECONDARY = "#d1d5db";
const ACCENT = "#4ade80";
const BADGE_PAST = "#6b7280";

function EventCard({ event }) {
  const { t } = useTranslation();

  const isUpcoming = event?.status === "upcoming";
  const badgeText = isUpcoming ? t("events.upcoming") : t("events.past");
  const badgeColor = isUpcoming ? ACCENT : BADGE_PAST;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      style={styles.card}
    >
      <img src={event.image} alt={t(event.titleKey)} style={styles.image} loading="lazy" />

      <div style={styles.content}>
        <div style={styles.headerRow}>
          <span style={{ ...styles.badge, backgroundColor: badgeColor }}>{badgeText}</span>
          <span style={styles.date}>{event.date}</span>
        </div>

        <h3 style={styles.title}>{t(event.titleKey)}</h3>
        <p style={styles.desc}>{t(event.descKey)}</p>

        <div style={styles.tagsWrap}>
          {event.tags?.map((tag) => (
            <span key={`${event.id}-${tag}`} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {isUpcoming && event.formUrl ? (
          <a
            href={event.formUrl}
            target="_blank"
            rel="noreferrer"
            style={styles.button}
          >
            {t("events.register")}
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

const styles = {
  card: {
    borderRadius: "18px",
    overflow: "hidden",
    background: CARD_BG,
    color: TEXT_PRIMARY,
    border: "1px solid rgba(243, 244, 246, 0.15)",
    boxShadow: "0 14px 32px rgba(0, 0, 0, 0.22)",
    display: "grid",
    gridTemplateRows: "220px 1fr",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "1rem",
    display: "grid",
    gap: "0.75rem",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.75rem",
  },
  badge: {
    color: "#0b1020",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "0.2rem 0.55rem",
    borderRadius: "999px",
    display: "inline-block",
  },
  date: {
    fontSize: "0.84rem",
    color: TEXT_SECONDARY,
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    lineHeight: 1.3,
  },
  desc: {
    margin: 0,
    color: TEXT_SECONDARY,
    lineHeight: 1.55,
    fontSize: "0.95rem",
  },
  tagsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.45rem",
  },
  tag: {
    fontSize: "0.74rem",
    color: TEXT_PRIMARY,
    border: "1px solid rgba(243, 244, 246, 0.2)",
    padding: "0.2rem 0.5rem",
    borderRadius: "999px",
    backgroundColor: "rgba(243, 244, 246, 0.06)",
  },
  button: {
    marginTop: "0.35rem",
    justifySelf: "start",
    textDecoration: "none",
    backgroundColor: ACCENT,
    color: "#0b1020",
    fontWeight: 700,
    fontSize: "0.88rem",
    padding: "0.55rem 0.9rem",
    borderRadius: "10px",
    transition: "transform 0.25s ease, filter 0.25s ease",
  },
};

export default EventCard;
