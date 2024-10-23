import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#E4E4E4',
        padding: 30,
        paddingTop: 65,
        fontSize: 24,
        fontFamily: 'Helvetica',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'normal',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerDate: {
        fontSize: 12,
    },
});

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Document</Text>
                <Text style={styles.headerDate}>{new Date().toLocaleString()}</Text>
            </View>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed porta metus. Sed in commodo erat, nec finibus sapien. Phasellus nec nisi sit amet nibh vulputate dictum. Nulla quis
                scelerisque dolor, a vulputate nibh. Morbi at nulla lectus. Praesent ut nibh sit amet est porttitor maximus. Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti.
                Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti.
                Nulla facilisi. Suspendisse potenti. Nulla facilisi. Suspendisse potenti.
            </Text>
        </Page>
    </Document>
);

export default MyDocument;
