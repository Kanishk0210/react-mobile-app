import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us',
    };

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        title="Our Address" 
                        titleStyle={{fontWeight: "bold"}}              
                        >
                        <Text>
                            121, Clear Water Bay Road{"\n"}
                            Clear Water Bay, Kowloon{"\n"}
                            HONG KONG{"\n"}
                            Tel: +852 1234 5678{"\n"}
                            Fax: +852 8765 4321{"\n"}
                            Email:confusion@food.net
                        </Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
            
        );
    }

}

export default Contact;