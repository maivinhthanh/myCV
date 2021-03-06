import React, { Component } from 'react';
import ContentField from './../../ElementCV/ContentField/ContentField';
import {connect} from 'react-redux';
import AwardSection from './AwardSection';
import * as actions from './../../../actions/actionAward';
import * as actionsCV from './../../../actions/info.action';
import uuidv1 from 'uuid';

var language = "";

class AwardSections extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      items : [],
      number : this.props.award.length
    }
  }

  shouldComponentUpdate(nextProps){
    language = nextProps.info.language;
    return true;
  }

  componentWillMount(){
    this.props.fetchAllAward(this.props.idcv);
  }

  changeLanguage = (language) =>{
    if (language === "vi" )
    return ("GIẢI THƯỞNG");
    else return ("AWARD");
  }

  addNew = (number) =>{
    return {
        _id: uuidv1(),
        name : "TÊN GIẢI THƯỞNG",
        day : "Ngày Cấp",
        type : "Loại Giải",
        by : "Cấp bởi tổ chức",
        idcv: this.props.idcv
    }
  }

  render() {
    var items = this.props.award;
    var {number} = this.state;
    
    return (
      <div className="Award-Sections">
        <ContentField name ={ this.changeLanguage(language)} 
            moveUp={(e)=>this.props.moveUpAward('Award', 'up', this.props.idcv)}
            moveDown={(e)=>this.props.moveDownAward('Award', 'down', this.props.idcv)}
            addSection={(e)=>this.props.addAward(this.addNew(number)) }
            hidden={(e)=>this.props.hidenAward('Award', this.props.idcv)} >
          {
            items.map((item,index) => (
              <AwardSection key={index} deleteSection = {(e)=>this.props.deleteAward(item._id)}  >{item}</AwardSection>
            ))
          }
        </ContentField>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    info : state.info,
    award : state.award,
    idcv: state.idcv
  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return{
    fetchAllAward : (idcv) =>{
      dispatch(actions.actFetchAwardRequest(idcv));
    },
    addAward : (number) =>{
      dispatch(actions.actAddAwardRequest(number));
    },
    deleteAward : (index) =>{
      dispatch(actions.actDeleteAwardRequest(index));
    },
    moveUpAward : (name, direction, idcv) =>{
      dispatch(actionsCV.actUpdateListComponent(name, direction, idcv));
    },
    moveDownAward : (name, direction, idcv) =>{
      dispatch(actionsCV.actUpdateListComponent(name, direction, idcv));
    },
    hidenAward : (name, idcv) =>{
      dispatch(actionsCV.actHiddenComponent(name, idcv));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AwardSections);