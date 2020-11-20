import React, {useState, useEffect}from 'react';
import clsx from 'clsx';

import {useToggle} from '../hooks/useToggle'
import {useInput} from '../hooks/useInput'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Button from '@material-ui/core/Button'
import {ChromePicker} from 'react-color'
import DraggableColorBox from './DraggableColorBox'

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height:"calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPalette() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, toggleOpen] = useToggle(false);
  const [currentColor, setCurrentColor] = useState('')
  const [colors, setColors] = useState([{color:'red',colorName:'red'}])
  const [colorName, updateColorName, resetColorName] = useInput('')

  const addNewColor = ()=>{
        let newColor = {
            color: currentColor,
            colorName: colorName,
        }
        setColors([...colors, newColor])
        updateColorName('')
  }

  useEffect( () => {
      ValidatorForm.addValidationRule("isColorNameUnique", value => {
          colors.every(({colorName}) => colorName.toLowerCase() !== value.toLowerCase())
      })

      ValidatorForm.addValidationRule("isColorUnique", value => {
        colors.every(({color}) => color.toLowerCase() !== currentColor)
    })
    },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
            <IconButton onClick={toggleOpen}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Typography variant="h4">Design your Palette</Typography>
        <div>
            <Button variant='contained' color='secondary'>Clear Palette</Button>
            <Button variant='contained' color='primary'>Random Color</Button>
        </div>
        <ChromePicker color={currentColor} onChangeComplete={selectedColor => setCurrentColor(selectedColor.hex)}/>   

        <ValidatorForm onSubmit={addNewColor}>
            <TextValidator value={colorName} 
                           onChange={updateColorName}
                           validators={['required', 'isColorNameUnique','isColorUnique']}
                           errorMessages={['This field is required.','Enter color name!','Color name is already given. please use unique name.']}/>

            <Button variant='contained' 
                color='primary' 
                type='submit'
                style={{background: currentColor}}>
                    Add Color</Button>
        </ValidatorForm>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
        <div className={classes.drawerHeader} />
            {colors.map(color => (
                <DraggableColorBox color={color.color} colorName={color.colorName}/>
            ))}
      </main>
    </div>
  );
}

