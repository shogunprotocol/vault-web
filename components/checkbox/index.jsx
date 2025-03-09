// CustomCheckbox.js
import React from 'react';
import s from './CustomCheckbox.module.scss'; // Path to your custom CSS module

const CustomCheckbox = ({ checked, onChange, label }) => {
    return (
        <label className={s.checkboxContainer}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={s.checkmark}></span>
            {label}
        </label>
    );
};

export default CustomCheckbox;
