import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
    //ocultar o Header que vem por padrão nas telas da Stack do React Navigation
    static navigationOptions = {
        header: null,
    }
    //indica que nesse componente é necessário a passagem de um objeto navigation que contenha as funções navigate e dispatch.
    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
        dispatch: PropTypes.func,
      }).isRequired,
    };

    //nele teremos uma variável para guardar o email digitado, outra variável para a senha e uma para guardar as mensagens de erro
    state = { email: '', password: '', error: '' };

    //recupera um parâmetro e guardá-lo na variável email do state
    handleEmailChange = (email) => {
        this.setState({ email });
      };
      
    //recupera um parâmetro e guardá-lo na variável password do state  
    handlePasswordChange = (password) => {
        this.setState({ password });
    };
    
    //navegar para a tela de cadastro, ela irá usar o método navigate que está disponível nas props do componente graças ao React Navigation
    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    //responsável pela comunicação com a API e dar um resultado de sucesso ou erro para o Login
    handleSignInPress = async () => {
      if (this.state.email.length === 0 || this.state.password.length === 0) {
        this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
      } else {
        try {
          const response = await api.post('/sessions', {
            email: this.state.email,
            password: this.state.password,
          });
            
          await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);
  
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        } catch (_err) {
          this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        }
      }
    };

    render() {
        return (
        <Container>
            <StatusBar hidden />
            <Logo source={require('../../images/logo.png')} resizeMode="contain" />
            <Input
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <Input
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            />
            {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <Button onPress={this.handleSignInPress}>
            <ButtonText>Entrar</ButtonText>
            </Button>
            <SignUpLink onPress={this.handleCreateAccountPress}>
            <SignUpLinkText>Criar conta grátis</SignUpLinkText>
            </SignUpLink>
        </Container>
        );
    }
}