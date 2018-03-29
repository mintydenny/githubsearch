import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Github from './Components/Github'
import Header from './Components/Header'
import Auth0Lock from 'auth0-lock'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idToken: '',
            profile: {}
        }
        this.setProfile = this.setProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
    };
    componentWillMount() {
        this.lock = new Auth0Lock(
            /ClientID/, /domain/
        );
        this.lock.on("authenticated", authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.log(error);
                    return;
                }
                this.setProfile(authResult.accessToken, profile);
            });
        });
        this.getProfile();
    }
    setProfile(accessToken, profile) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        this.setState({
            idToken: localStorage.getItem('accessToken'),
            profile: JSON.parse(localStorage.getItem('profile'))
        })
    }
    getProfile() {
        if (localStorage.getItem('idToken') != null) {
            this.setState({
                idToken: localStorage.getItem('accessToken'),
                profile: JSON.parse(localStorage.getItem('profile'))
            }), () => {
                console.log(this.state)
            };
        }
    }
    showLock() {
        this.lock.show();
    }
    logout() {
        this.setState({
                idToken: '',
                profile: {}
            }, () => {
                localStorage.removeItem('idToken');
                localStorage.removeItem('profile')
            }
        )
    }
    render() {
        let result;
        if (this.state.idToken) {
            result = <Github/>
        } else {
            result = "Click on Login to begin search"
        }
        return (
            <div className="App">
                <Header
                    lock={this.lock}
                    idToken={this.state.idToken}
                    onLogin={this.showLock.bind(this)}
                    onLogout={this.logout.bind(this)}/>
                {result}
            </div>
        );
    }
}
export default App;
