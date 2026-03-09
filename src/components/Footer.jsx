import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <p style={styles.text}>© {new Date().getFullYear()} Student Energy at NCKU. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0f172a",
    color: "#cbd5e1",
  },
  inner: {
    margin: "0 auto",
    maxWidth: "1120px",
    padding: "1.25rem",
  },
  text: {
    margin: 0,
    textAlign: "center",
    fontSize: "0.9rem",
  },
};

export default Footer;
