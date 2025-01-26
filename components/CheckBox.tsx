import { color, GlobalStyles } from "@/assets/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CheckboxProps = {
  initIsChecked: boolean;
  onChange: (newCheckStatus: boolean) => void;
  label?: string;
};

function Checkbox({ initIsChecked, onChange, label }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initIsChecked);

  const handlePress = () => {
    setIsChecked((prev) => !prev);
    onChange(!isChecked);
  };

  return (
    <View style={styles.checkboxContainer}>
      <Pressable
        onPress={handlePress}
        style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
      {label && <Text style={GlobalStyles.NormalText} numberOfLines={0}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
});

export default Checkbox;
