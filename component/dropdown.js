import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const Dropdown = ({ options, onSelect, defaultText, style, renderOption, labelKey, valueKey }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setShowDropdown(false);
    };

    const defaultRenderOption = (item) =>{
  
        return(
            <Text style={styles.optionText}>{item[labelKey]}</Text>
            )
    }

    


    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={() => setShowDropdown(true)}>
                <Text style={styles.selectedText}>{defaultText}</Text>
            </TouchableOpacity>
            <Modal
                visible={showDropdown}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowDropdown(false)}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        style={styles.FlatList}
                        renderItem={({ item }) => (
                            <View style={styles.renderItemContainer}>
                                <TouchableOpacity onPress={() => handleSelect(item)}>
                                     {renderOption ? renderOption(item) : defaultRenderOption(item)}

                                    
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item , index) => index}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color:"white",
        backgroundColor:"white",
        marginBottom:10,
       
    },
    selectedText: {
        fontSize: 16,
        color:"black"
    },
    FlatList: {
        position:"absolute",
        top:"40%",
        width:300,
        backgroundColor: "white",
        padding: "10px",
        borderRadius:5,
        color:"black"
    },
    modalContainer: {
        borderRadius:5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color:"black"
    },
    optionText: {
        padding: 10,
        fontSize: 16,
        color:"black"
        
    },
});

export default Dropdown;
