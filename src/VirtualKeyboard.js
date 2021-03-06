'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

import styles from './VirtualKeyboard.style';

class VirtualKeyboard extends Component {

	static propTypes = {
		pressMode: React.PropTypes.oneOf(['string', 'char']),
		color: React.PropTypes.string,
		onPress: React.PropTypes.func.isRequired,
		backspaceImg: React.PropTypes.number,
		applyBackspaceTint: React.PropTypes.bool,
		decimal: React.PropTypes.bool,
	}

	static defaultProps = {
		pressMode: 'string',
		color: 'gray',
		backspaceImg: require('./backspace.png'),
		applyBackspaceTint: true,
		decimal: false,
	}

	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{this.Row([1, 2, 3])}
				{this.Row([4, 5, 6])}
				{this.Row([7, 8, 9])}
				<View style={styles.row}>
					{this.props.decimal ? this.Cell('.') : <View style={{ flex: 1 }} /> }
					{this.Cell(0)}
					{this.Backspace()}
				</View>
			</View>
		);
	}

	Backspace() {
		return (
			<TouchableOpacity accessibilityLabel='backspace' style={styles.backspace} onPress={() => { this.onPress('back') }}>
				<Image source={this.props.backspaceImg} resizeMode='contain' style={this.props.applyBackspaceTint && ({ tintColor: this.props.color })} />
			</TouchableOpacity>
		);
	}

	Row(numbersArray) {
		let cells = numbersArray.map((val) => this.Cell(val));
		return (
			<View style={styles.row}>
				{cells}
			</View>
		);
	}

	Cell(symbol) {
		return (
			<TouchableOpacity style={styles.cell} key={symbol} accessibilityLabel={symbol.toString()} onPress={() => { this.onPress(symbol.toString()) }}>
				<Text style={[styles.number, { color: this.props.color }]}>{symbol}</Text>
			</TouchableOpacity>
		);
	}

	onPress(val) {
		if (this.props.pressMode === 'string') {
			let curText = this.state.text;
			if (isNaN(val)) {
				if (val === 'back') {
					curText = curText.slice(0, -1);
				} else {
					curText += val;
				}
			} else {
				curText += val;
			}
			this.setState({ text: curText });
			this.props.onPress(curText);
		} else /* if (props.pressMode == 'char')*/ {
			this.props.onPress(val);
		}
	}
}


module.exports = VirtualKeyboard;
