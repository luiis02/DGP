import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import Layaout from "../../components/Layaout/Layaout";
import { useNavigation } from "@react-navigation/native";
import { obtenerPictograma } from "../../api/apiArasaac";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLegend } from 'victory';
import moment from 'moment';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';



const InformeAlumno = ({route}) => { 
    const pictogramas = { 
        atras: "38249/38249_2500.png",
    };
    const navigation = useNavigation();
    const {alumno, historialTareas} = route.params || {};
    const [urlAtras, setUrlAtras] = useState(null);
    const [progreso, setProgreso] = useState({ dataCompletadas: [], dataPendientes: [] });

    // Utilidad para dar formato a las fechas:
    const formatearFecha = (cadenaFecha) => {
        const date = new Date(cadenaFecha); // Convertir la cadena en objeto Date
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(date);
    };
    
    // Consultas a la BD:
    const fetch = async () => {

        // Obtener el pictograma del icono de retroceso de página:
        const respuesta = await obtenerPictograma(pictogramas.atras);
        if (respuesta) {
            setUrlAtras(respuesta);
        } else {
            Alert.alert("Error al obtener el pictograma.");
        }

        // Preparar datos para el gráfico del informe:
        // Generar los últimos 7 días
        const last7Days = Array.from({ length: 7 }, (_, i) => 
            moment().subtract(i, 'days').format('YYYY-MM-DD')).reverse();

        // Filtrar tareas completadas por fecha de fin (transformar fechas a YYYY-MM-DD)
        const dataCompletadas = last7Days.map(day => ({
            day,
            cantidad: historialTareas.filter(tarea => {
            const fechaFin = moment(tarea.fecha_fin).format('YYYY-MM-DD'); // Normalizar
            return tarea.estado === 'TERMINADA' && fechaFin === day;
            }).length,
        }));
    
        // Contar tareas pendientes que aún no tienen fecha de finalización
        const dataPendientes = last7Days.map(day => ({
            day,
            cantidad: historialTareas.filter(tarea => {
            const fechaInicio = moment(tarea.fecha_inicio).format('YYYY-MM-DD'); // Normalizar
            return (
                tarea.estado === 'EN PROCESO' &&
                (moment(fechaInicio).isSameOrBefore(day) || !fechaInicio)
            );
            }).length,
        }));

        setProgreso({ dataCompletadas, dataPendientes });
        
    }
    
    useEffect(() => {
        fetch();
    }, []);

    // Función para generar el PDF con el informe:
    const generarPDF = async () => {
        try {
          // HTML para generar el PDF
          const htmlContent = `
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { text-align: center; color: #4caf50; }
                  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                  th { background-color: #f2f2f2; }
                  .green { color: #4caf50; }
                  .red { color: #f44336; }
                </style>
              </head>
              <body>
                <h1>Informe de Progreso</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Terminadas</th>
                      <th>En Proceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${progreso.dataCompletadas.map((completada, index) => `
                      <tr>
                        <td>${moment(completada.day).format('DD MMM')}</td>
                        <td class="green">${completada.cantidad}</td>
                        <td class="red">${progreso.dataPendientes[index].cantidad}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </body>
            </html>
          `;
    
          // Crear el PDF
          const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
          // Compartir el PDF
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
          } else {
            Alert.alert('PDF generado', `El archivo está en: ${uri}`);
          }
        } catch (error) {
          Alert.alert('Error', 'No se pudo generar el PDF');
        }
    };



    return (
        <Layaout>
            {/* Título de la pantalla */}
            <View style={styles.header}>
                {Platform.OS !== 'android' &&
                    <TouchableOpacity onPress={() => navigation.navigate("GestionInformacion")}>
                        {urlAtras && <Image source={{ uri: urlAtras }} style={styles.iconBack} />}
                    </TouchableOpacity>
                }
                <View>
                    <Text style={styles.titleHeader}>Informe</Text>
                    <Text style={styles.subTitleHeader}>Alumna: {alumno.nombre} {alumno.apellido}</Text>
                </View>
            </View>

            <ScrollView 
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
            >
                <View style={styles.body}>
                    {/* Datos del alumno */}
                    <View style={styles.header}>
                        <Image source={{uri: alumno.foto_perfil}} style={{width: 80, height: 80, borderRadius: 40}} />
                        <Text style={styles.cabecera}>{alumno.nombre} {alumno.apellido}</Text>
                    </View>

                    {/* Historial con todas las tareas (activas y terminadas): */}
                    <View style={styles.contenedorCabecera}>
                        <Text style={styles.cabecera}>Historial de tareas</Text>
                    </View>
                    
                    {/* Cabeceras de la tabla donde se muestran los datos del historial */}
                    <View style={styles.header}>
                        <Text style={styles.headerCell}>ID tarea</Text>
                        <Text style={styles.headerCell}>Fecha inicio</Text>
                        <Text style={styles.headerCell}>Fecha fin</Text>
                        <Text style={styles.headerCell}>Estado</Text>
                        <Text style={styles.headerCell}>Prioridad</Text>
                    </View>

                    {/* Historial de las tareas realizadas por el alumno pasado */}
                    <View style={styles.scrollView}>
                        {Array.isArray(historialTareas) && 
                        historialTareas.length > 0 ? (
                            historialTareas.map((item) => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.item}
                                >
                                    <Text style={styles.itemText}>{item.id}</Text>
                                    <Text style={styles.itemText}>{formatearFecha(item.fecha_inicio)}</Text>
                                    <Text style={styles.itemText}>{formatearFecha(item.fecha_fin)}</Text>
                                    <Text style={styles.itemText}>{item.estado}</Text>
                                    <Text style={styles.itemText}>{item.prioridad}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.itemText}>No hay tareas disponibles</Text>
                        )}
                    </View>
                    <View>
                        {/* Gráfico para representar los datos de una manera más visual */}
                        <Text style={styles.title}>Gráfico de tareas de la última semana</Text>

                        <VictoryChart 
                            domainPadding={{ x: 20, y: 10 }}
                            style={{
                                parent: { height: 300 }, // Ajusta la altura
                            }}>

                            {/* Leyenda */}
                            <VictoryLegend
                            x={125}
                            y={10}
                            orientation="horizontal"
                            gutter={20}
                            data={[
                                { name: "Terminadas", symbol: { fill: "#4caf50" } },
                                { name: "En proceso", symbol: { fill: "#f44336" } },
                            ]}
                            style={{
                                labels: { fontSize: 12 },
                            }}
                            />

                            <VictoryAxis
                            tickFormat={t => moment(t).format('DD MMM')}
                            style={{
                                tickLabels: { fontSize: 10, angle: -45, padding: 15 },
                            }}
                            />
                            <VictoryAxis
                            dependentAxis
                            tickFormat={t => `${t}`}
                            style={{
                                tickLabels: { fontSize: 10 },
                            }}
                            />
                            <VictoryGroup offset={10} colorScale={["#4caf50", "#f44336"]}>
                            <VictoryBar
                                data={progreso.dataCompletadas}
                                x="day"
                                y="cantidad"
                                labels={({ datum }) => `${datum.cantidad}`}
                                style={{
                                data: { width: 8 },
                                }}
                            />
                            <VictoryBar
                                data={progreso.dataPendientes}
                                x="day"
                                y="cantidad"
                                labels={({ datum }) => `${datum.cantidad}`}
                                style={{
                                data: { width: 8 },
                                }}
                            />
                            </VictoryGroup>
                        </VictoryChart>
                    </View>

                    {/* Botón para generar un PDF con el informe */}
                    <View style={styles.contenedorBoton}>
                        <TouchableOpacity 
                        style={styles.botonGenerarInforme} 
                        onPress={generarPDF}
                        >
                            <Text style={styles.botonTexto}>Generar PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Layaout>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBack: {
        width: 50,
        height: 50,
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    subTitleHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    body: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    filtrar: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },    
    item: {
        flexDirection: 'row',
        paddingLeft: 3,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
    },
    itemText: {
        flex: 1,
        fontSize: 13,
        textAlign: 'center',
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cabecera: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contenedorCabecera: {
        marginBottom: 50,
    },
    contenedorBoton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    botonGenerarInforme: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    botonTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold', 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
        taskName: {
        fontSize: 16,
    },
    taskStatus: {
        fontSize: 16,
        fontStyle: 'italic',
    },
});

export default InformeAlumno;