import React, { Component } from "react";
import _ from 'lodash'
import { connect } from "react-redux";
import GridLayout from "react-grid-layout";
import { mapCard } from "../../../helperFunction/Cardmap";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from "antd";
import "antd/dist/antd.css";
import { updatePosition } from "../../../actions";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: {
    offset: 19,
    span: 5,
  },
};

const initGrid = { x: 4, y: 0, w: 4, h: 5 };

class ContactForm extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      currLayout: []
    }
  }

  onLayoutChange = (layout, layouts) => {
    console.log(layout)
    //COMMENT OUT BELOW TO STOP CALLING UPDATEfIELD FUNCTION
    var changedField = _.differenceWith(layout, this.state.currLayout, _.isEqual);
    // console.log(changedField, "changesss")
    this.setState({ currLayout: layout })
    changedField.map((item, i) => {
      var { i, x, y, w, h } = item
      // this.props.updatePosition(i, { x, y, w, h })
      // console.log(i, x, y, w, h)
    })
  };

  onFinish = (values) => {
    console.log("form data", values);
    this.props.closeModal();
    this.formRef.current.resetFields();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() { 
    console.log(this.props.allComponents.Widgets, "propsss")
    var currentWidget = this.props.allComponents.Widgets.filter(item => {
      if(item.hasOwnProperty(this.props.widgetID)){
        return item[this.props.widgetID]
      }
    })
    var formFields = currentWidget[0][this.props.widgetID].childs
    // console.log(formFields, "curr", currentWidget)
    const mappedFields = formFields.map((item, i) => {
      // console.log(item, "item")
      return (
        <div key={item.fieldID} data-grid={initGrid}>
          {mapCard(item.fieldData)}
        </div>
      );
    });
    return (
      <div className="form-box">
        <Form
          {...layout}
          layout="vertical"
          className="form-wrapper"
          style={{ width: "100%" }}
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <GridLayout
            onLayoutChange={this.onLayoutChange}
            className="layout"
            cols={12}
            rowHeight={30}
            width={1200}
          >
           
            {mappedFields}

          </GridLayout>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allComponents: state.allComponents,
});

const mapDispatchToProps = (dispatch) => ({
  updatePosition,
});

export default connect(mapStateToProps, {
  updatePosition,
})(ContactForm);
