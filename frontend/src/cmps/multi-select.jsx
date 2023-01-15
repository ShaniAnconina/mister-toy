import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, labels, theme) {
    return {
        fontWeight:
            labels.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelectChip({ labels, setLabels }) {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const theme = useTheme()

    useEffect(() => {
        loadToys()
    }, [])

    const toysLabelsMap = getToysLabels()

    function getToysLabels() {
        const toysLabelsMap = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    if (acc[label]) return
                    else acc[label] = ''
                })
                return acc
            }, {})
        return Object.keys(toysLabelsMap)
    }


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setLabels(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    return (
        <div className='multi-select'>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={labels}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {toysLabelsMap.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, labels, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}