import React, { Component } from "react";
import { ProgressBar } from 'react-bootstrap';

const colors = {
    blue: "#33aeff",
    gray: "#f5f5f5",
    red: '#e64437',
    green: '#2bc64f',
    black: '#000000'
}

const styles = {
    container: {
	width: 320,
	display: 'block',
	margin: 'auto' 
    },
    subcontainer: {
	height: 20,
	width: 290,
	position: "relative",
	marginBottom: 12,
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: 10 
    },
    progressBarContainer: {
	width: 290,
	height: 4,
	position: "absolute",
	marginTop: 8,
	marginBottom: 8
    },
    progBar: {
	width: 140,
	height: 4,
	backgroundColor: colors.blue
    },    
    dot1: {
	height: 20,
	width: 20,
	backgroundColor: colors.blue,
	borderRadius: 40,
	position: "absolute"
    },    
    dot2: {
	height: 20,
	width: 20,
	backgroundColor: colors.gray,
	borderRadius: 40,
	position: "absolute",
	right: 135
    },
    dot3: {
	height: 20,
	width: 20,
	backgroundColor: colors.gray,
	borderRadius: 40,
	position: "absolute",
	right: 0
    },
    createdLabel: {
	width: 60,
	height: 15,
	fontSize: 12
    },
    label2: {
	width: 60,
	height: 15,
	textAlign: "center",
	fontSize: 12,
	marginLeft: 65 
    },
    label3: {
	height: 15,
	float: 'right',
    }
    
}

//  Possible statuses: 
//  - 'depositing'
//  - 'receiving'
//  - 'deposited'
//  - 'sent'
//  - 'received'
//  - 'cancelling'
//  - 'cancelled'

class e2pTransferBar extends React.Component {

    _getProgressBarStyle() {
	const { status, isError } = this.props;
	const progBarStyle = {...styles.progBar};

	
	switch (status) {
	case 'deposited':
	case 'sent':
	case 'received':
	    if (!isError) {
		progBarStyle.width = 290;
	    }
	    break;
	}

	
	return progBarStyle;
    }

    _isProcessing() {
	const { status } = this.props;
	let processing = false;
	switch (status) {
	case 'depositing':
	case 'cancelling':
	case 'receiving':	    
	    processing = true;
	    break;
	}
	return processing;
	
    }

 	// case 'depositing':
	// case 'receiving':	    
	// case 'deposited':
	// case 'sent':
	// case 'received':
	    
	// case 'cancelling':
	// case 'cancelled':
    
    _getDot2Color() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return colors.red;
	} else {
	    return colors.blue;
	}
    }

    _getLabel2Color() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return colors.red;
	} else {
	    return colors.black;
	}
    }

    _getLabel2Text() {
	const { status, isError } = this.props;
	if (isError) {
	    return 'Failed';
	}
	if (status === 'cancelled') {
	    return 'Canceled';
	}
	return 'Processing';
    }

    _getDot3() {
	const { status, isError } = this.props;
	if (isError) {
	    return (<div className="dot" style={styles.dot3}></div>);
	}	
	switch (status) { 
	case 'deposited':
	    return (<div className="step-dot step-dot-blue">
		    <div className="step-dot-inner-2">
		    <div className="step-dot-inner-3">
		    <span className="step-dot-inner-4 fa fa-check" />
		    </div>		    
		    </div>
		    </div>);

	case 'sent':
	case 'received':
	    return (<div className="step-dot step-dot-green">
		    <div className="step-dot-inner-2">
		    <div className="step-dot-inner-3">
		    <span className="step-dot-inner-4 fa fa-check" />
		    </div>		    
		    </div>
		    </div>);
	default:
	    return (<div className="dot" style={styles.dot3}></div>);
	} 
    };

    _getLabel3() {
	let offset;
	const label = this._getLabel3Text();
	const { status, isError } = this.props;	
	if (label === 'Sent') {
	    offset = 10;
	} else {
	    offset = -15;
	}
	if (status === 'deposited' || isError) {
	    offset = 0;
	}
	return (
	    <label style={{...styles.label3, color: this._getLabel3Color(), marginRight: offset}}>
	      { label }
	    </label>
	);
    }
    
    _getLabel3Color() {
	const { status, isError } = this.props;
	if (!isError) { 
	    switch (status) { 
	    case 'deposited':
		return colors.blue;
	    case 'sent':
	    case 'received':
		return colors.green;
	    }
	}
	return '#999999';
    }

    _getLabel3Text() {
	const { direction, status } = this.props;
	if (direction === 'in' || status === 'sent') {
	    return 'Received';
	}	
	return 'Sent';
    }

    
    render() {
	const progBarStyle = this._getProgressBarStyle();
	const dot2Color = this._getDot2Color();	
        const dot2Style = {...styles.dot2, backgroundColor: dot2Color };
	
        return (
            <div style={styles.container}>
                <div style={styles.subcontainer}>
                    <div className="progress" style={styles.progressBarContainer}>
                      <div className="progress-bar" role="progressbar" style={progBarStyle} ></div>
                    </div>
                    <div className="dot" style={styles.dot1}></div>
                    <div className={this._isProcessing() ? 'dot scale-up-center' : 'dot'} style={dot2Style}></div>
		    { this._getDot3() }
                </div>
                <div>
                    <label style={styles.createdLabel}>Created</label>
                    <label style={{...styles.label2, color: this._getLabel2Color()}}>{this._getLabel2Text()}</label>
                    { this._getLabel3()}
                </div>
            </div>

        );
    }
}


export default e2pTransferBar;
