import React, { useEffect } from "react";
import BlueEye from "./BlueEye";

export default function HeroBlueEye() {
  useEffect(() => {
    // Saludo automático más temprano y más largo
    setTimeout(() => {
      const evt = new CustomEvent("blueeye-saludo", {
        detail: "¡Hola! Soy Blu-ai, tu asesora virtual inmobiliaria. Bienvenidos al futuro de los bienes raíces en el metaverso. Aquí podrás explorar propiedades reales en tres dimensiones antes de tomar cualquier decisión."
      });
      window.dispatchEvent(evt);
    }, 2000);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
      }}
    >
      {/* Background optimizado sin video pesado */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          zIndex: -1
        }}
      />

      {/* Overlay para contraste */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,30,0.4)",
          zIndex: 0
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 2rem"
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}>
          Bienvenido a <span style={{ color: "#0EE7E7" }}>BlueEye</span>
        </h1>
        <p style={{ fontSize: "1.3rem", marginBottom: "2rem", opacity: 0.8 }}>
          Tu asesora virtual en el metaverso inmobiliario.
        </p>

        {/* 🤖 Avatar BlueEye en primer plano */}
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <BlueEye height={480} autoRotate={true} />
        </div>

        <button
          style={{
            marginTop: "2rem",
            background: "#0EE7E7",
            color: "#0a0f1a",
            padding: "0.9rem 2rem",
            borderRadius: "12px",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 20px rgba(14, 231, 231, 0.3)",
            transition: "all 0.3s ease"
          }}
          onClick={() => {
            // Scroll to properties section
            const propertiesSection = document.querySelector('[data-section="properties"]');
            if (propertiesSection) {
              propertiesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(14, 231, 231, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(14, 231, 231, 0.3)";
          }}
        >
          Explorar Propiedades
        </button>
      </div>
    </section>
  );
}
