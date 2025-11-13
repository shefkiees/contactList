import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    Image, 
    Alert, 
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Platform,
    Linking
} from "react-native";

import { Ionicons } from '@expo/vector-icons'; 

const Colors = {
    primary: '#1D78E0', 
    background: '#F8F9FA', 
    card: '#FFFFFF', 
    text: '#212121', 
    secondaryText: '#6C757D', 
    separator: '#DEE2E6', 
    accent: '#00B894', 
    shadowColor: '#171717', 
};

const contactsData = [
    { "id": "1", "name": "Adelina Krasniqi", "email": "adelina.krasniqi@gmail.com", "phone": "+383 44 123 456", "avatar": "https://i.pravatar.cc/150?img=1", "address": "Rr. Nëna Terezë 45, Prishtinë" },
    { "id": "2", "name": "Arben Morina", "email": "arben.morina@yahoo.com", "phone": "+383 49 234 567", "avatar": "https://i.pravatar.cc/150?img=2", "address": "Rr. Fehmi Agani 12, Prizren" },
    { "id": "3", "name": "Albina Gashi", "email": "albina.gashi@hotmail.com", "phone": "+383 44 345 678", "avatar": "https://i.pravatar.cc/150?img=3", "address": "Rr. UCK 78, Pejë" },
    { "id": "4", "name": "Bekim Hoxha", "email": "bekim.h@outlook.com", "phone": "+383 45 456 789", "avatar": "https://i.pravatar.cc/150?img=4", "address": "Rr. Zahir Pajaziti 23, Gjakovë" },
    { "id": "5", "name": "Besarta Dervishi", "email": "besarta.d@gmail.com", "phone": "+383 48 567 890", "avatar": "https://i.pravatar.cc/150?img=5", "address": "Rr. Mbretëresha Teuta 56, Prishtinë" },
    { "id": "6", "name": "Blerta Rexhepi", "email": "blerta.rexhepi@hotmail.com", "phone": "+383 44 678 901", "avatar": "https://i.pravatar.cc/150?img=6", "address": "Rr. Dardania 89, Ferizaj" },
    { "id": "7", "name": "Dardan Berisha", "email": "dardan.berisha@gmail.com", "phone": "+383 49 789 012", "avatar": "https://i.pravatar.cc/150?img=7", "address": "Rr. Bill Clinton 34, Prishtinë" },
    { "id": "8", "name": "Diana Kastrati", "email": "diana.kastrati@yahoo.com", "phone": "+383 44 890 123", "avatar": "https://i.pravatar.cc/150?img=8", "address": "Rr. Agim Ramadani 67, Mitrovicë" },
    { "id": "9", "name": "Driton Haliti", "email": "driton.haliti@outlook.com", "phone": "+383 45 901 234", "avatar": "https://i.pravatar.cc/150?img=9", "address": "Rr. Rexhep Mala 12, Pejë" },
    { "id": "10", "name": "Donika Sejdiu", "email": "donika.s@gmail.com", "phone": "+383 48 012 345", "avatar": "https://i.pravatar.cc/150?img=10", "address": "Rr. Sheshi Nënë Tereza 90, Prizren" },
    { "id": "11", "name": "Edon Fazliu", "email": "edon.fazliu@hotmail.com", "phone": "+383 44 123 567", "avatar": "https://i.pravatar.cc/150?img=11", "address": "Rr. Lidhja e Prizrenit 45, Gjakovë" },
    { "id": "12", "name": "Eliona Ymeri", "email": "eliona.ymeri@yahoo.com", "phone": "+383 49 234 678", "avatar": "https://i.pravatar.cc/150?img=12", "address": "Rr. Veternik 78, Prishtinë" },
    { "id": "13", "name": "Enis Shala", "email": "enis.shala@gmail.com", "phone": "+383 44 345 789", "avatar": "https://i.pravatar.cc/150?img=13", "address": "Rr. Ismail Qemali 23, Mitrovicë" },
    { "id": "14", "name": "Erblina Gërguri", "email": "erblina.gerguri@outlook.com", "phone": "+383 45 456 890", "avatar": "https://i.pravatar.cc/150?img=14", "address": "Rr. Dëshmorët e Kombit 56, Ferizaj" },
    { "id": "15", "name": "Faton Mehmeti", "email": "faton.m@gmail.com", "phone": "+383 48 567 901", "avatar": "https://i.pravatar.cc/150?img=15", "address": "Rr. UÇK 34, Pejë" },
    { "id": "16", "name": "Fatime Kelmendi", "email": "fatime.kelmendi@hotmail.com", "phone": "+383 44 678 012", "avatar": "https://i.pravatar.cc/150?img=16", "address": "Rr. Elez Agushi 67, Prizren" },
    { "id": "17", "name": "Fitore Jashari", "email": "fitore.jashari@yahoo.com", "phone": "+383 49 789 123", "avatar": "https://i.pravatar.cc/150?img=17", "address": "Rr. Adem Jashari 89, Gjakovë" },
    { "id": "18", "name": "Flamur Hyseni", "email": "flamur.hyseni@gmail.com", "phone": "+383 44 890 234", "avatar": "https://i.pravatar.cc/150?img=18", "address": "Rr. Tringë Smajli 12, Prishtinë" },
    { "id": "19", "name": "Gent Krasniqi", "email": "gent.krasniqi@outlook.com", "phone": "+383 45 901 345", "avatar": "https://i.pravatar.cc/150?img=19", "address": "Rr. Skënderbeu 45, Mitrovicë" },
    { "id": "20", "name": "Gentiana Ahmeti", "email": "gentiana.a@gmail.com", "phone": "+383 48 012 456", "avatar": "https://i.pravatar.cc/150?img=20", "address": "Rr. Fehmi Lladrovci 78, Pejë" },
    { "id": "21", "name": "Granit Zeneli", "email": "granit.zeneli@hotmail.com", "phone": "+383 44 123 678", "avatar": "https://i.pravatar.cc/150?img=21", "address": "Rr. Bashkimi 23, Ferizaj" },
    { "id": "22", "name": "Gresa Maloku", "email": "gresa.maloku@yahoo.com", "phone": "+383 49 234 789", "avatar": "https://i.pravatar.cc/150?img=22", "address": "Rr. Garibaldi 56, Prizren" },
    { "id": "23", "name": "Hana Beqiri", "email": "hana.beqiri@gmail.com", "phone": "+383 44 345 890", "avatar": "https://i.pravatar.cc/150?img=23", "address": "Rr. Ukshin Hoti 34, Gjakovë" },
    { "id": "24", "name": "Ilir Musliu", "email": "ilir.musliu@outlook.com", "phone": "+383 45 456 901", "avatar": "https://i.pravatar.cc/150?img=24", "address": "Rr. Marin Barleti 67, Prishtinë" },
    { "id": "25", "name": "Iliriana Salihu", "email": "iliriana.s@gmail.com", "phone": "+383 48 567 012", "avatar": "https://i.pravatar.cc/150?img=25", "address": "Rr. Sheshi i Lirisë 89, Mitrovicë" },
    { "id": "26", "name": "Jeton Bytyqi", "email": "jeton.bytyqi@hotmail.com", "phone": "+383 44 678 123", "avatar": "https://i.pravatar.cc/150?img=26", "address": "Rr. Dëshmorët 12, Pejë" },
    { "id": "27", "name": "Kaltrina Gashi", "email": "kaltrina.gashi@yahoo.com", "phone": "+383 49 789 234", "avatar": "https://i.pravatar.cc/150?img=27", "address": "Rr. Muharrem Fejza 45, Ferizaj" },
    { "id": "28", "name": "Leart Krasniqi", "email": "leart.k@gmail.com", "phone": "+383 44 890 345", "avatar": "https://i.pravatar.cc/150?img=28", "address": "Rr. Rruga B 78, Prizren" },
    { "id": "29", "name": "Liridona Hoxha", "email": "liridona.hoxha@outlook.com", "phone": "+383 45 901 456", "avatar": "https://i.pravatar.cc/150?img=29", "address": "Rr. Xheladin Deda 23, Gjakovë" },
    { "id": "30", "name": "Luan Berisha", "email": "luan.berisha@gmail.com", "phone": "+383 48 012 567", "avatar": "https://i.pravatar.cc/150?img=30", "address": "Rr. Sulejman Vokshi 56, Prishtinë" },
    { "id": "31", "name": "Majlinda Kastrati", "email": "majlinda.k@hotmail.com", "phone": "+383 44 123 789", "avatar": "https://i.pravatar.cc/150?img=31", "address": "Rr. Fan Noli 34, Mitrovicë" },
    { "id": "32", "name": "Mërgim Morina", "email": "mergim.morina@yahoo.com", "phone": "+383 49 234 890", "avatar": "https://i.pravatar.cc/150?img=32", "address": "Rr. Leke Dukagjini 67, Pejë" },
    { "id": "33", "name": "Mimoza Rexha", "email": "mimoza.rexha@gmail.com", "phone": "+383 44 345 901", "avatar": "https://i.pravatar.cc/150?img=33", "address": "Rr. Bulevardi i Pavarësisë 89, Ferizaj" },
    { "id": "34", "name": "Naim Halili", "email": "naim.halili@outlook.com", "phone": "+383 45 456 012", "avatar": "https://i.pravatar.cc/150?img=34", "address": "Rr. Mbretëresha Teutë 12, Prizren" },
    { "id": "35", "name": "Nora Kelmendi", "email": "nora.k@gmail.com", "phone": "+383 48 567 123", "avatar": "https://i.pravatar.cc/150?img=35", "address": "Rr. Hajdar Dushi 45, Gjakovë" },
    { "id": "36", "name": "Orhan Gërguri", "email": "orhan.gerguri@hotmail.com", "phone": "+383 44 678 234", "avatar": "https://i.pravatar.cc/150?img=36", "address": "Rr. Ramiz Sadiku 78, Prishtinë" },
    { "id": "37", "name": "Petrit Shala", "email": "petrit.shala@yahoo.com", "phone": "+383 49 789 345", "avatar": "https://i.pravatar.cc/150?img=37", "address": "Rr. Faik Konica 23, Mitrovicë" },
    { "id": "38", "name": "Pranvera Ahmeti", "email": "pranvera.ahmeti@gmail.com", "phone": "+383 44 890 456", "avatar": "https://i.pravatar.cc/150?img=38", "address": "Rr. Qamil Hoxha 56, Pejë" },
    { "id": "39", "name": "Qëndrim Mehmeti", "email": "qendrim.m@outlook.com", "phone": "+383 45 901 567", "avatar": "https://i.pravatar.cc/150?img=39", "address": "Rr. Jeta e Re 34, Ferizaj" },
    { "id": "40", "name": "Rinor Zeneli", "email": "rinor.zeneli@gmail.com", "phone": "+383 48 012 678", "avatar": "https://i.pravatar.cc/150?img=40", "address": "Rr. Lidhja e Lezhës 67, Prizren" },
    { "id": "41", "name": "Saranda Krasniqi", "email": "saranda.k@hotmail.com", "phone": "+383 44 123 890", "avatar": "https://i.pravatar.cc/150?img=41", "address": "Rr. Isa Boletini 89, Gjakovë" },
    { "id": "42", "name": "Shpend Hyseni", "email": "shpend.hyseni@yahoo.com", "phone": "+383 49 234 901", "avatar": "https://i.pravatar.cc/150?img=42", "address": "Rr. Perandori Justinian 12, Prishtinë" },
    { "id": "43", "name": "Teuta Maloku", "email": "teuta.maloku@gmail.com", "phone": "+383 44 345 012", "avatar": "https://i.pravatar.cc/150?img=43", "address": "Rr. Ataturk 45, Mitrovicë" },
    { "id": "44", "name": "Urim Berisha", "email": "urim.berisha@outlook.com", "phone": "+383 45 456 123", "avatar": "https://i.pravatar.cc/150?img=44", "address": "Rr. Xhevdet Doda 78, Pejë" },
    { "id": "45", "name": "Valdete Gashi", "email": "valdete.g@gmail.com", "phone": "+383 48 567 234", "avatar": "https://i.pravatar.cc/150?img=45", "address": "Rr. Sami Frashëri 23, Ferizaj" },
    { "id": "46", "name": "Visar Kastrati", "email": "visar.kastrati@hotmail.com", "phone": "+383 44 678 345", "avatar": "https://i.pravatar.cc/150?img=46", "address": "Rr. Naim Frashëri 56, Prizren" },
    { "id": "47", "name": "Vjollca Hoxha", "email": "vjollca.hoxha@yahoo.com", "phone": "+383 49 789 456", "avatar": "https://i.pravatar.cc/150?img=47", "address": "Rr. Vaso Pasha 34, Gjakovë" },
    { "id": "48", "name": "Xhevdet Morina", "email": "xhevdet.morina@gmail.com", "phone": "+383 44 890 567", "avatar": "https://i.pravatar.cc/150?img=48", "address": "Rr. Afërdita 67, Prishtinë" },
    { "id": "49", "name": "Ylber Haliti", "email": "ylber.haliti@outlook.com", "phone": "+383 45 901 678", "avatar": "https://i.pravatar.cc/150?img=49", "address": "Rr. Mujo Ulqinaku 89, Mitrovicë" },
    { "id": "50", "name": "Yllka Sejdiu", "email": "yllka.s@gmail.com", "phone": "+383 48 012 789", "avatar": "https://i.pravatar.cc/150?img=50", "address": "Rr. Azem Bejta 12, Pejë" }
];

const getContactCountText = (count) => {
    if (count === 1) {
        return "1 Contact";
    }
    return `${count} Contacts`;
};

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleCall = (phoneNumber) => {
        const url = `tel:${phoneNumber.replace(/\s/g, '')}`; 
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Cannot Open Dialer", `Could not open phone app for number: ${phoneNumber}`);
            }
        });
    };
    
    const handleEmail = (emailAddress) => {
        const url = `mailto:${emailAddress}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Cannot Open Email App", `Could not open email app for address: ${emailAddress}`);
            }
        });
    };

    const handlePress = (contact) => {
        Alert.alert(
            `Details: ${contact.name}`,
            `
📞 Phone: ${contact.phone}
📧 Email: ${contact.email}
📍 Address: ${contact.address}
            `,
            [
                { text: "Call", onPress: () => handleCall(contact.phone) }, 
                { text: "Email", onPress: () => handleEmail(contact.email) }, 
                { text: "Cancel", style: 'cancel' }
            ]
        );
    };

    const filteredContacts = contactsData.filter(contact => {
        const term = searchTerm.toLowerCase();
        return contact.name.toLowerCase().includes(term) ||
               contact.phone.includes(searchTerm) || 
               contact.email.toLowerCase().includes(term);
    }).sort((a, b) => a.name.localeCompare(b.name));

    const handleClearSearch = () => setSearchTerm('');
    
    const contactCountText = getContactCountText(filteredContacts.length); 

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 16 }}>
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
                
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    
                    <View style={styles.detailRow}>
                        <Ionicons 
                            name="call-outline" 
                            size={16} 
                            color={Colors.text} 
                            style={styles.detailIcon} 
                        />
                        <Text style={styles.phone} numberOfLines={1}>{item.phone}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Ionicons 
                            name="mail-outline" 
                            size={16} 
                            color={Colors.secondaryText} 
                            style={styles.detailIcon} 
                        />
                        <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.callButton} 
                    onPress={() => handleCall(item.phone)}
                >
                    <Ionicons 
                        name="call" 
                        size={20} 
                        color={Colors.card}
                    />
                </TouchableOpacity>
                
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1 }}></View> 
                    
                    <View style={styles.headerTitleGroup}>
                        <Ionicons name="call-outline" size={28} color={Colors.text} style={{ marginRight: 8 }} />
                        <Text style={styles.header}>Contacts</Text>
                    </View>
                    
                    <View style={styles.headerActions}>
                        <Text style={styles.resultCountText}>{filteredContacts.length}</Text>
                    </View>
                </View>
                
                <View style={styles.headerDivider} />

                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={20} color={Colors.secondaryText} style={{marginRight: 8}} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search contacts..." 
                        value={searchTerm}
                        onChangeText={setSearchTerm} 
                        placeholderTextColor={Colors.secondaryText}
                    />
                    {searchTerm.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch} style={{ paddingLeft: 8 }}>
                            <Ionicons name="close-circle-sharp" size={20} color={Colors.secondaryText} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.listSubtitle}>{contactCountText}</Text> 

                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="people-outline" size={60} color={Colors.separator} style={{ marginBottom: 15 }} />
                            <Text style={styles.emptyText}>No contacts found matching your search.</Text>
                        </View>
                    )}
                />
            </View>
            <StatusBar style="dark" /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background, 
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 25 : 0, 
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        height: 40, 
    },
    headerTitleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2, 
    },
    headerActions: {
        flex: 1, 
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    header: {
        fontSize: 26, 
        fontWeight: "700", 
        color: Colors.text,
        letterSpacing: -0.3,
    },
    resultCountText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.primary,
        paddingRight: 5,
    },
    headerDivider: {
        height: 1,
        backgroundColor: Colors.separator,
        marginBottom: 15,
        width: '100%',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: 12, 
        paddingHorizontal: 15,
        height: 50, 
        marginBottom: 15,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.separator, 
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
        paddingVertical: 10,
    },
    listSubtitle: { 
        textAlign: 'left',
        color: Colors.secondaryText,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '600',
        paddingLeft: 5,
    },
    card: {
        flexDirection: "row",
        backgroundColor: Colors.card,
        paddingVertical: 15,
        paddingHorizontal: 18,
        alignItems: "center",
        borderRadius: 14, 
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.separator, 
    },
    avatarContainer: {
        width: 55, 
        height: 55,
        borderRadius: 27.5,
        marginRight: 15,
        backgroundColor: Colors.separator,
        overflow: 'hidden', 
        borderWidth: 2,
        borderColor: Colors.background, 
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18, 
        fontWeight: "700", 
        color: Colors.text,
        marginBottom: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2, 
    },
    detailIcon: {
        marginRight: 6,
    },
    
    phone: {
        fontSize: 13,
        color: Colors.text, 
        fontWeight: '500', 
    },
    
    email: {
        fontSize: 13,
        color: Colors.secondaryText,
    },
    callButton: {
        backgroundColor: Colors.primary, 
        width: 45, 
        height: 45,
        borderRadius: 22.5, 
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 80, 
    },
    emptyText: {
        fontSize: 16,
        color: Colors.secondaryText,
        textAlign: 'center',
        marginTop: 10,  
    }
});