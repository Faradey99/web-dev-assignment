import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function OptionSet({ label, options, selectedOptions, onChange }) {
  const isChecked = (optionName) => {
    return selectedOptions.includes(optionName);
  }

  const optionSet = options.map(({ name, label }, index) =>
    <FormControlLabel
      control={
        <Checkbox onChange={onChange} name={name} checked={isChecked(name)} />
      }
      label={label}
      key={index}
    />
  );

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>{optionSet}</FormGroup>
    </FormControl>
  );
}

OptionSet.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};
