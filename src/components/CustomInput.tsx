import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required = false,
  error,
  helperText,
  value,
  onChangeText,
  style,
  editable = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.requiredAsterisk}> *</Text>}
      </View>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9E9E9E"
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {editable && !!value && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onChangeText && onChangeText('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!error && !!helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  requiredAsterisk: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: '#1976D2',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFFAFA',
  },
  inputDisabled: {
    backgroundColor: '#EEEEEE',
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 46,
    fontSize: 15,
    color: '#212121',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#9E9E9E',
    fontSize: 13,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  helperText: {
    color: '#757575',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
