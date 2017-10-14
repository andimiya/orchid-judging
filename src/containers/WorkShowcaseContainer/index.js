import React from 'react';
import WorkShowcase from '../../components/WorkShowcase';
import WorkContainer from '../../containers/WorkContainer';
import { createClient } from 'contentful';
import { SPACE_ID, ACCESSTOKEN } from '../../constants';

class WorkShowcaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getAllResources = this.getAllResources.bind(this);
    this.handleResourceClick = this.handleResourceClick.bind(this);
    this.client = createClient({
      space: SPACE_ID,
      accessToken: ACCESSTOKEN
    });
    this.state = {
      content: [],
      selectedContent: {},
      selectedWorkSample: '',
      urlSlug: '',
      error: ''
    };
  }

  componentDidMount(){
    this.getAllResources();
  }

  getAllResources(){
    this.client.getEntries()
    .then((entry) => {
      this.setState ({ content: entry.items });
      let urlSlug = this.props.location.pathname.split('/').pop();
      const currentlySelected = this.state.content.find((workItem) => workItem.fields.slug === urlSlug);
      if (!currentlySelected){
        this.setState({ error: 'error' })
      } else {
        this.setState({
          selectedContent: currentlySelected.fields,
          selectedWorkSample: currentlySelected.fields.workSample.fields.file.url
        })
      }
    })
  }

  handleResourceClick(e) {
    const currentlySelected = this.state.content.find((workItem) => workItem.fields.slug === e.target.id);
    this.scrollTo(0,0);
    if (!currentlySelected){
      this.setState ({ error: 'error' })
    } else {
      this.setState({
        selectedContent: currentlySelected.fields,
        selectedWorkSample: currentlySelected.fields.workSample.fields.file.url
      })
    }
  }

  render(props) {
    console.log(this.state.selectedWorkSample);
    return (
      <div className="work-showcase-container outer">
        <WorkShowcase
          title={this.state.selectedContent.title}
          description={this.state.selectedContent.description}
          workSample={this.state.selectedWorkSample}
          />
        <WorkContainer
          content={this.state.content}
          handleResourceClick={this.handleResourceClick}
        />
      </div>
    );
  }
};

export default WorkShowcaseContainer;
