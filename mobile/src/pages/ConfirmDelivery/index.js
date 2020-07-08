import React, { useRef, useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';

import { AuthContext } from '~/contexts/auth';
import api from '~/services/api';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  TakePhotoButton,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const parseImageUri = (uri) => {
  const filename = uri.split('/').pop();
  const [, ext] = /\.(\w+)$/.exec(filename);
  const type = `image/${ext}`;

  return {
    uri,
    type,
    name: filename,
  };
};

const ConfirmDelivery = () => {
  const { user } = useContext(AuthContext);
  const { params } = useRoute();
  const navigation = useNavigation();
  const camera = useRef();
  const [imageUri, setImageUri] = useState();

  const handleSubmit = async () => {
    const image = parseImageUri(imageUri);

    const data = new FormData();
    data.append('file', image);

    try {
      const {
        data: { id: signature_id },
      } = await api.post('files/', data);

      await api.post(`/orders/${params.id}/delivery/${user.id}`, {
        signature_id,
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ position: 'absolute', left: 20 }}
          >
            <Icon name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <HeaderTitle>Informar Problema</HeaderTitle>
        </HeaderContent>
      </Header>

      <RNCamera
        ref={(ref) => {
          camera.current = ref;
        }}
        style={{
          alignSelf: 'center',
          aspectRatio: 1,
          width: '80%',
        }}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <TakePhotoButton
        onPress={async () => {
          const options = { quality: 1, pauseAfterCapture: true };
          const { uri } = await camera.current.takePictureAsync(options);
          setImageUri(uri);
        }}
      >
        <Icon size={20} color="#ffffff" name="camera" />
      </TakePhotoButton>

      <SubmitButton onPress={handleSubmit} disabled={!imageUri}>
        <SubmitButtonText>Enviar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default ConfirmDelivery;
