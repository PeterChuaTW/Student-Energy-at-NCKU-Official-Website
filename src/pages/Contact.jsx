import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.title}>{t("contact.title")}</h1>
        <p style={styles.subtitle}>{t("contact.subtitle")}</p>

        <div style={styles.formWrap}>
          <iframe
            title="Student Energy Contact Form"
            src="https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform?embedded=true"
            width="100%"
            height="820"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            style={styles.iframe}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "7.5rem 1.25rem 4rem",
    background: "#f1f5f9",
    minHeight: "70vh",
  },
  container: {
    margin: "0 auto",
    maxWidth: "980px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "0.75rem",
    marginBottom: "1.5rem",
    color: "#475569",
    lineHeight: 1.7,
  },
  formWrap: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    overflow: "hidden",
  },
  iframe: {
    display: "block",
    minHeight: "65vh",
  },
};

export default Contact;
