import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text, StyleSheet } from 'react-native';
import { TextInput, Divider } from 'react-native-paper';
import { getCountries } from '../services/countryService';
import { GetCountriesResponse } from '../interfaces/country/getCountries';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onCountryChange }) => {
  const [countries, setCountries] = useState<GetCountriesResponse[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<GetCountriesResponse[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState(''); // Texto ingresado por el usuario

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        console.log('Países obtenidos.');
        setCountries(response); // Asigna la lista completa de países al estado
        setFilteredCountries(response); // Inicialmente, todos los países están visibles
      } catch (error) {
        console.error('Error al obtener los países:', error);
      }
    };

    fetchCountries();
  }, []);

  // Filtrar países en función del texto ingresado
  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.Name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchText, countries]);

  return (
    <View>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <TextInput
          label="País"
          value={countries.find((c) => c.Code === selectedCountry)?.Name || ''}
          style={{ marginBottom: 16 }}
          mode="flat"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={{ maxHeight: 300, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
          {/* Campo de búsqueda */}
          <TextInput
            label="Buscar país"
            value={searchText}
            onChangeText={setSearchText}
            style={{ marginBottom: 8, paddingHorizontal: 10 }}
            mode="flat"
          />

          {/* Lista de países filtrados */}
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.Code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onCountryChange(item.Code);
                  setMenuVisible(false);
                }}
                style={{ padding: 10 }}
              >
                <Text style={styles.countryText}>{item.Name}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <Divider />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countryText: {
    color: '#FFFFFF', // Cambia el color del texto a blanco
  },
});

export default CountrySelector;