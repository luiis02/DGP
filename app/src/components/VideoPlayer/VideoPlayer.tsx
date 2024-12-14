import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";

// Detectar entorno web
const isWeb = Platform.OS === "web";

const VideoPlayer = ({ videoId }) => {
  if (isWeb) {
    // Renderizar un iframe directamente en web
    return (
      <View style={styles.webContainer}>
        <iframe
          style={styles.iframe}
          src={`https://www.youtube.com/embed/${videoId}?controls=1&autoplay=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </View>
    );
  }

  // Usar YouTubeIframe para móvil
  return (
    <YouTubeIframe
      height={200}
      width={300}
      videoId={videoId}
      play={false}
      onError={(e) => console.error("Error en YouTubeIframe:", e)}
    />
  );
};

const styles = StyleSheet.create({
  webContainer: {
    width: "100%", // Ancho completo del contenedor
    aspectRatio: 16 / 9, // Relación de aspecto estándar
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fondo para resaltar el video
  },
  iframe: {
    width: "100%", // Asegura que el iframe ocupe el ancho completo
    height: "100%", // Asegura que el iframe ocupe la altura completa
    borderWidth: 0, // Elimina cualquier borde predeterminado
  },
});

export default VideoPlayer;
