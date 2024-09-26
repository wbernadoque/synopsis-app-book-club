import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes';
import {
  Container,
  Title,
  TextDescription,
  TextTopic,
  ContainerText,
  SubTitle,
  TextTopicItalic,
  ItalicIn,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Platform, ScrollView, View } from 'react-native';
import ButtonPrimary from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../styles/global';
import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from 'react-native-paper';

type Terms = StackNavigationProp<RootStackParamList, 'Terms'>;

const Terms: React.FC = (docType: any) => {
  const navigation = useNavigation<Terms>();
  const [docTypeText, setDocTypeText] = useState<string>(
    docType?.route?.params?.docType || ''
  );

  return (
    <>
      {docTypeText === 'term' && (
        <Container style={{ position: 'relative' }}>
          <Title allowFontScaling={false} style={{ marginBottom: 12 }}>
            TERMOS DE USO
          </Title>
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={[Colors.backgroundDark, 'transparent']}
                start={{ x: 0, y: 0.8 }}
                end={{ x: 0, y: 1 }}
              />
            }
          >
            <ScrollView>
              <ContainerText>
                <TextDescription allowFontScaling={false}>
                  Este aplicativo é mantido e operado pela equipe do Synopsis.
                  Nós coletamos e utilizamos alguns dados pessoais que pertencem
                  aqueles que utilizam nosso aplicativo. Ao fazê-lo, agimos na
                  qualidade de controlador desses dados e estamos sujeitos às
                  disposições da Lei Federal n. 13.709/2018 (Lei Geral de
                  Proteção de Dados Pessoais - LGPD). Nós cuidamos da proteção
                  de seus dados pessoais e, por isso, disponibilizamos esta
                  política de privacidade, que contém informações importantes
                  sobre:
                </TextDescription>
                <TextTopic>- Quem deve utilizar nosso aplicativo</TextTopic>
                <TextTopic>
                  - Quais dados coletamos e o que fazemos com eles mais um pouco
                  do texto
                </TextTopic>
                <TextTopic>
                  - Seus direitos em relação aos seus dados pessoais
                </TextTopic>
                <TextTopic>- Como entrar em contato conosco.</TextTopic>
                <SubTitle>1. Dados que coletamos e motivos da coleta</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Nosso aplicativo coleta e utiliza alguns dados pessoais de
                  nossos usuários, de acordo com o disposto nesta seção.
                </TextDescription>
                <TextTopicItalic>
                  1. Dados pessoais fornecidos expressamente pelo usuário
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Nós coletamos os seguintes dados pessoais que nossos usuários
                  nos fornecem expressamente ao utilizar nosso aplicativo:
                </TextDescription>
                <TextTopic>-Endereço de Email</TextTopic>
                <TextTopic>-Localização;</TextTopic>
                <TextTopic>-Preferências de leitura;</TextTopic>
                <TextDescription allowFontScaling={false}>
                  A Coleta destes dados ocorre nos seguintes momentos:
                </TextDescription>
                <TextTopic>- Acesso ao aplicativo pela primeira vez;</TextTopic>
                <TextTopic>
                  - Preenchimento do email no cadastro da newsletter;
                </TextTopic>
                <TextTopic>- Cadastro do usuário;</TextTopic>
                <TextTopic>
                  - Interação com as informações dispostas no aplicativo
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  Os dados fornecidos por nossos usuários são coletados com as
                  seguintes finalidade
                </TextDescription>
                <TextTopic>
                  - Realizar análises e estudos relacionados ao comportamento,
                  demografia dos usuários seu interesse em obras e livros, para
                  entender suas demandas e necessidades;
                </TextTopic>
                <TextTopic>
                  - Aperfeiçoar campanhas de marketing realizadas por parceiros
                  do Synopsis;
                </TextTopic>
                <TextTopic>
                  - Analisar tráfego dos usuários no aplicativo;
                </TextTopic>
                <TextTopic>
                  - Enviar informações administrativas, como alterações em
                  nossos termos, condições e políticas;
                </TextTopic>
                <TextTopic>
                  - Enviar informações relativas aos produtos e serviços
                  oferecidos pelo Synopsis e seus parceiros, como obras e livros
                  em destaques,
                </TextTopic>
                <TextTopic>
                  - Identificar tendências de uso do aplicativo, por exemplo,
                  entender quais partes de nossos Serviços são de maior
                  interesse para nossos clientes;
                </TextTopic>
                <TextTopic>
                  - Possibilitar navegação e performance no aplicativo;
                </TextTopic>
                <TextTopic>
                  - Determinar a eficácia de campanhas promocionais;
                </TextTopic>
                <TextTopic>- Anúncios e conteúdos patrocinados;</TextTopic>
                <TextTopic>
                  - Fornecer análises, mensuração e outros serviços comerciais
                  para ajudar parceiros do Synopsis a medir a eficácia de
                  campanhas de marketing e a descoberta de seu público alvo;
                </TextTopic>
                <TextTopicItalic>
                  2. Dados pessoais obtidos de outras formas
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Nós coletamos os seguintes dados pessoais de nossos usuários:
                </TextDescription>
                <TextTopic>- endereço de IP;</TextTopic>
                <TextTopic>- dados de geolocalização;</TextTopic>
                <TextTopic>
                  - dados de utilização do aplicativo, como cliques efetuados,
                  tempo de uso, etc;
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  A Coleta destes dados ocorre nos seguintes momentos:
                </TextDescription>
                <TextTopic>- Personalizar a experiência do usuário;</TextTopic>
                <TextTopic>- Impedir atividades fraudulentas;</TextTopic>
                <TextTopic>
                  - Fornecer análises, mensuração e outros serviços comerciais
                  para ajudar parceiros do Synopsis a medir a eficácia de
                  campanhas de marketing e a descoberta de seu público alvo;
                </TextTopic>
                <TextTopicItalic>3. Dados sensíveis</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Não serão coletados dados sensíveis de nossos usuários, assim
                  entendidos aqueles definidos nos arts. 11 e seguintes da Lei
                  de Proteção de Dados Pessoais. Assim, não haverá coleta de
                  dados sobre origem racial ou étnica, convicção religiosa,
                  opinião política, filiação a sindicato ou a organização de
                  caráter religioso, filosófico ou político, dado referente à
                  saúde ou à vida sexual, dado genético ou biométrico, quando
                  vinculado a uma pessoa natural.
                </TextDescription>
                <SubTitle>4. Cookies</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Cookies são pequenos arquivos de texto baixados
                  automaticamente em seu dispositivo quando você acessa e navega
                  por um aplicativo. Eles servem, basicamente, para que seja
                  possível identificar dispositivos, atividades e preferências
                  de usuários. Os cookies não permitem que qualquer arquivo ou
                  informação sejam extraídos do disco rígido do usuário, não
                  sendo possível, ainda, que, por meio deles, se tenha acesso a
                  informações pessoais que não tenham partido do usuário ou da
                  forma como utiliza os recursos do aplicativo.
                </TextDescription>
                <TextTopicItalic>a. Cookies do aplicativo</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Os cookies do aplicativo só aqueles enviados ao computador ou
                  dispositivo do usuário e administrador exclusivamente pelo
                  aplicativo. As informações coletadas por meio destes cookies
                  são utilizadas para melhorar e personalizar a experiência do
                  usuário, sendo que alguns cookies podem, por exemplo, ser
                  utilizados para lembrar as preferências e escolhas do usuário,
                  bem como para o oferecimento de conteúdo personalizado.
                </TextDescription>
                <TextTopicItalic>b. Cookies de terceiros</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Alguns de nossos parceiros podem configurar cookies nos
                  dispositivos dos usuários que acessam nosso aplicativo. Estes
                  cookies, em geral, visam possibilitar que nossos parceiros
                  possam oferecer seu conteúdo e seus serviços ao usuário que
                  acessa nosso aplicativo de forma personalizada, por meio da
                  obtenção de dados de navegação extraídos a partir de sua
                  interação com o aplicativo. O usuário poderá obter mais
                  informações sobre os cookies de terceiro e sobre a forma como
                  os dados obtidos a partir dele sendo tratados, além de ter
                  acesso a descrição dos cookies utilizados e de suas
                  características, acessando o seguinte link:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Google Analytics: https:/developers.
                  google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hI=pt-br
                  As entidades encarregadas da coleta dos cookies poderão ceder
                  as informações obtidas a terceiros.
                </TextDescription>
                <TextTopicItalic>c. Gestão de cookies</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  O usuário poderá se opor ao registro de cookies pelo
                  aplicativo, bastando que desative esta opção no seu próprio
                  navegador. Mais informações sobre como fazer isso em alguns
                  dos principais navegadores utilizados hoje podem ser acessadas
                  a partir dos seguintes links:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Internet Explorer:
                  https://support.microsoft.com/pt-br/help/17442/windows-intemnet-explorer-delete-manage-cookies
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Safari:
                  https:/support.apple.com/pt-br/guide/safari/sfri11471/mac
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Google Chrome: https://support.
                  oogle.com/chrome/answer/95647?hI=pt-BR&him=pt
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Mozilla Firefox: https:/support.
                  mozilla.org/pt-BR/kb/ative-e-desative-os-cookies-que-os-aplicativos-usam
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Opera: https://www.opera.com/help/tutorials/security/privacy/
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  A desativação dos cookies, no entanto, pode afetar a
                  disponibilidade de algumas ferramentas e funcionalidades do
                  aplicativo, comprometendo seu correto e esperado
                  funcionamento. Outra consequência possível é remoção das
                  preferências do usuário que eventualmente tiverem sido salvas,
                  prejudicando sua experiência.
                </TextDescription>
                <TextTopicItalic>
                  5. Coleta de dados não previstos expressamente
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Eventualmente, outros tipos de dados não previstos
                  expressamente nesta Política de Privacidade poderão ser
                  coletados, desde que sejam fornecidos com o consentimento do
                  usuário, ou, ainda, que a coleta seja permitida com fundamento
                  em outra base legal prevista em lei. Em qualquer caso, a
                  coleta de dados e as atividades de tratamento dela decorrentes
                  serão informadas aos usuários do aplicativo.
                </TextDescription>
                <SubTitle>
                  2. Compartilhamento de dados pessoais com terceiros
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Nós não compartilhamos seus dados pessoais com terceiros.
                  Apesar disso, é possível que o façamos para cumprir alguma
                  determinação legal ou regulatória, ou, ainda, para cumprir
                  alguma ordem expedida por autoridade pública.
                </TextDescription>
                <SubTitle>
                  3. Por quanto tempo seus dados pessoais serão armazenados
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Os dados pessoais coletados pelo aplicativo são armazenados e
                  utilizados por período de tempo que corresponda ao necessário
                  para atingir as finalidades elencadas neste documento e que
                  considere os direitos de seus titulares, os direitos do
                  controlador do aplicativo e as disposições legais ou
                  regulatórias aplicáveis. Uma vez expirados os períodos de
                  armazenamento dos dados pessoais, eles são removidos de nossas
                  bases de dados ou anonimizados, salvo nos casos em que houver
                  a possibilidade ou a necessidade de armazenamento em virtude
                  de disposição legal ou regulatória.
                </TextDescription>
                <SubTitle>
                  4. Bases legais para o tratamento de dados pessoais
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Cada operação de tratamento de dados pessoais precisa ter um
                  fundamento jurídico, ou seja, uma base legal, que nada mais é
                  que uma justificativa que a autorize, prevista na Lei Geral de
                  Proteção de Dados Pessoais. Todas as nossas atividades de
                  tratamento de dados pessoais possuem uma base legal que as
                  fundamenta, dentre as permitidas pela legislação. Mais
                  informações sobre as bases legais que utilizamos para
                  operações de tratamento de dados pessoais específicas podem
                  ser obtidas a partir de nossos canais de contato, informados
                  ao final desta Política.
                </TextDescription>
                <SubTitle>5. Direitos do titular</SubTitle>
                <TextDescription allowFontScaling={false}>
                  A LGPD garante a todos os titulares direitos sobre seus dados
                  pessoais. De acordo com a Lei, o titular tem direito a
                  requerer:
                </TextDescription>
                <TextTopic>
                  - Confirmação da existência de tratamento de dados pessoais -
                  Direito a saber se a instituição trata ou não seus dados
                  pessoais.
                </TextTopic>
                <TextTopic>
                  - Acesso aos seus dados pessoais - Direito a ter acesso aos
                  dados pessoais que são tratados pela instituição, caso esse
                  tratamento exista.
                </TextTopic>
                <TextTopic>
                  - Correção de dados pessoais incompletos, inexatos ou
                  desatualizados - Direito a ter seus dados sempre completos,
                  corretos e atualizados.
                </TextTopic>
                <TextTopic>
                  - Anonimização, bloqueio ou eliminação de dados
                  desnecessários, excessivos ou tratados em desconformidade com
                  a lei - Direito a ter seus dados pessoais anonimizados
                  (impossibilitar a identificação de um indivíduo através do
                  dado), bloquear seu tratamento ou excluí-los.
                </TextTopic>
                <TextTopic>
                  -Portabilidade dos dados pessoais a outro fornecedor de
                  serviço - Direito a ter seus dados pessoais enviados a outras
                  instituições mediante sua requisição.
                </TextTopic>
                <TextTopicItalic>
                  1. Como o titular pode exercer seus direitos
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Para garantir que o usuário que pretende exercer seus direitos
                  é, de fato, titular dos dados pessoais objeto da requisição,
                  poderemos solicitar documentos ou outras informações que
                  possam auxiliar em sua correta identificação, a fim de
                  resguardar nossos direitos e os direitos de terceiros. Isto
                  somente será feito, porém, se for absolutamente necessário, e
                  o requerente receberá todas as informações relacionadas.
                </TextDescription>
                <SubTitle>
                  6. Medidas de segurança no tratamento de dados pessoais
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Empregamos medidas técnicas e organizativas aptas a proteger
                  os dados pessoais de acessos não autorizados e de situações de
                  destruição, perda, extravio ou alteração desses dados. As
                  medidas que utilizamos levam em consideração a natureza dos
                  dados, o contexto e a finalidade do tratamento, os riscos que
                  uma eventual violação geraria para os direitos e liberdades do
                  usuário, e os padres atualmente empregados no mercado por
                  empresas semelhantes à nossa.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Entre as medidas de segurança adotadas por nós, destacamos as
                  seguintes:
                </TextDescription>
                <TextTopic>
                  - Os dados de nossos usuários são armazenados em ambiente
                  seguro;
                </TextTopic>
                <TextTopic>
                  - Limitamos o acesso aos dados de nossos usuários, de modo que
                  terceiros não autorizados não o possam acessá-los;
                </TextTopic>
                <TextTopic>
                  - Utilizamos certificado SSL (Secure Socket Layer), de modo
                  que a transmissão de dados entre os dispositivos dos usuários
                  e nossos servidores aconteça de forma criptografada;
                </TextTopic>
                <TextTopic>
                  - Mantemos registros de todos aqueles que têm, de alguma
                  forma, contato com nossos dados.
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  Ainda que adote tudo o que está ao seu alcance para evitar
                  incidentes de segurança, é possível que ocorra algum problema
                  motivado exclusivamente por um terceiro - como em caso de
                  ataques de hackers ou crackers ou, ainda, em caso de culpa
                  exclusiva do usuário, que ocorre, por exemplo, quando ele
                  mesmo transfere seus dados a terceiro. Assim, embora sejamos,
                  em geral, responsáveis pelos dados pessoais que tratamos, nos
                  eximimos de responsabilidade caso ocorra uma situação
                  excepcional como essas, sobre as quais não temos nenhum tipo
                  de controle.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  De qualquer forma, caso ocorra qualquer tipo de incidente de
                  segurança que possa gerar risco ou dano relevante para
                  qualquer de nossos usuários, comunicaremos os afetados e a
                  Autoridade Nacional de Proteção de Dados acerca do ocorrido,
                  em conformidade com o disposto na Lei Geral de Proteção de
                  Dados.
                </TextDescription>
                <SubTitle>7. Alterações nesta política</SubTitle>
                <View style={{ flexDirection: 'row' }}>
                  <TextDescription allowFontScaling={false}>
                    A presente versão desta Política de Privacidade foi
                    atualizada pela última vez em: 07/07/2021.
                  </TextDescription>
                </View>
                <TextDescription allowFontScaling={false}>
                  Reservamo-nos o direito de modificar, a qualquer momento, as
                  presentes normas, especialmente para adaptá-las às eventuais
                  alterações feitas em nosso aplicativo, seja pela
                  disponibilização de novas funcionalidades, seja pela supressão
                  ou modificação daquelas já existentes.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Sempre que houver uma modificação, nossos usuários serão
                  notificados acerca da mudança.
                </TextDescription>
                <SubTitle>8. Como entrar em contato conosco</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Para esclarecer quaisquer dúvidas sobre esta Política de
                  Privacidade ou sobre os dados pessoais que tratamos, entre em
                  contato com nosso Encarregado de Proteção de Dados Pessoais,
                  por algum dos canais mencionados abaixo:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  E-mail: synopsis.contato@gmail.com
                </TextDescription>
                <SubTitle>Lei aplicável</SubTitle>
                <View
                  style={{
                    marginBottom: Platform.OS === 'android' ? 38 : 16,
                  }}
                >
                  <TextDescription allowFontScaling={false}>
                    Este documento é regido e deve ser interpretado de acordo
                    com as leis da República Federativa do Brasil. Fica eleito o
                    Foro da circunscrição judiciária de Brasília, Distrito
                    Federal, como o competente para dirimir quaisquer questões
                    porventura oriundas do presente documento.
                  </TextDescription>
                </View>
              </ContainerText>
            </ScrollView>
          </MaskedView>

          <View
            style={{
              marginLeft: 16,
              marginTop: 24,
              marginBottom: Platform.OS === 'android' ? 38 : 0,
            }}
          >
            <ButtonPrimary
              navigation={() => navigation.goBack()}
              width="full"
              title="Voltar"
            />
          </View>
        </Container>
      )}
      {docTypeText === 'policy' && (
        <Container style={{ position: 'relative' }}>
          <Title allowFontScaling={false} style={{ marginBottom: 12 }}>
            POLÍTICA DE PRIVACIDADE
          </Title>
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={[Colors.backgroundDark, 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0, y: 1 }}
              />
            }
          >
            <ScrollView>
              <ContainerText>
                <TextDescription allowFontScaling={false}>
                  Este aplicativo é mantido e operado pela equipe do Synopsis.
                  Nós coletamos e utilizamos alguns dados pessoais que pertencem
                  aqueles que utilizam nosso aplicativo. Ao fazê-lo, agimos na
                  qualidade de controlador desses dados e estamos sujeitos às
                  disposições da Lei Federal n. 13.709/2018 (Lei Geral de
                  Proteção de Dados Pessoais - LGPD). Nós cuidamos da proteção
                  de seus dados pessoais e, por isso, disponibilizamos esta
                  política de privacidade, que contém informações importantes
                  sobre:
                </TextDescription>
                <TextTopic>- Quem deve utilizar nosso aplicativo</TextTopic>
                <TextTopic>
                  - Quais dados coletamos e o que fazemos com eles mais um pouco
                  do texto
                </TextTopic>
                <TextTopic>
                  - Seus direitos em relação aos seus dados pessoais
                </TextTopic>
                <TextTopic>- Como entrar em contato conosco.</TextTopic>
                <SubTitle>1. Dados que coletamos e motivos da coleta</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Nosso aplicativo coleta e utiliza alguns dados pessoais de
                  nossos usuários, de acordo com o disposto nesta seção.
                </TextDescription>
                <TextTopicItalic>
                  1. Dados pessoais fornecidos expressamente pelo usuário
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Nós coletamos os seguintes dados pessoais que nossos usuários
                  nos fornecem expressamente ao utilizar nosso aplicativo:
                </TextDescription>
                <TextTopic>-Endereço de Email</TextTopic>
                <TextTopic>-Localização;</TextTopic>
                <TextTopic>-Preferências de leitura;</TextTopic>
                <TextDescription allowFontScaling={false}>
                  A Coleta destes dados ocorre nos seguintes momentos:
                </TextDescription>
                <TextTopic>- Acesso ao aplicativo pela primeira vez;</TextTopic>
                <TextTopic>
                  - Preenchimento do email no cadastro da newsletter;
                </TextTopic>
                <TextTopic>- Cadastro do usuário;</TextTopic>
                <TextTopic>
                  - Interação com as informações dispostas no aplicativo
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  Os dados fornecidos por nossos usuários são coletados com as
                  seguintes finalidade
                </TextDescription>
                <TextTopic>
                  - Realizar análises e estudos relacionados ao comportamento,
                  demografia dos usuários seu interesse em obras e livros, para
                  entender suas demandas e necessidades;
                </TextTopic>
                <TextTopic>
                  - Aperfeiçoar campanhas de marketing realizadas por parceiros
                  do Synopsis;
                </TextTopic>
                <TextTopic>
                  - Analisar tráfego dos usuários no aplicativo;
                </TextTopic>
                <TextTopic>
                  - Enviar informações administrativas, como alterações em
                  nossos termos, condições e políticas;
                </TextTopic>
                <TextTopic>
                  - Enviar informações relativas aos produtos e serviços
                  oferecidos pelo Synopsis e seus parceiros, como obras e livros
                  em destaques,
                </TextTopic>
                <TextTopic>
                  - Identificar tendências de uso do aplicativo, por exemplo,
                  entender quais partes de nossos Serviços são de maior
                  interesse para nossos clientes;
                </TextTopic>
                <TextTopic>
                  - Possibilitar navegação e performance no aplicativo;
                </TextTopic>
                <TextTopic>
                  - Determinar a eficácia de campanhas promocionais;
                </TextTopic>
                <TextTopic>- Anúncios e conteúdos patrocinados;</TextTopic>
                <TextTopic>
                  - Fornecer análises, mensuração e outros serviços comerciais
                  para ajudar parceiros do Synopsis a medir a eficácia de
                  campanhas de marketing e a descoberta de seu público alvo;
                </TextTopic>
                <TextTopicItalic>
                  2. Dados pessoais obtidos de outras formas
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Nós coletamos os seguintes dados pessoais de nossos usuários:
                </TextDescription>
                <TextTopic>- endereço de IP;</TextTopic>
                <TextTopic>- dados de geolocalização;</TextTopic>
                <TextTopic>
                  - dados de utilização do aplicativo, como cliques efetuados,
                  tempo de uso, etc;
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  A Coleta destes dados ocorre nos seguintes momentos:
                </TextDescription>
                <TextTopic>- Personalizar a experiência do usuário;</TextTopic>
                <TextTopic>- Impedir atividades fraudulentas;</TextTopic>
                <TextTopic>
                  - Fornecer análises, mensuração e outros serviços comerciais
                  para ajudar parceiros do Synopsis a medir a eficácia de
                  campanhas de marketing e a descoberta de seu público alvo;
                </TextTopic>
                <TextTopicItalic>3. Dados sensíveis</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Não serão coletados dados sensíveis de nossos usuários, assim
                  entendidos aqueles definidos nos arts. 11 e seguintes da Lei
                  de Proteção de Dados Pessoais. Assim, não haverá coleta de
                  dados sobre origem racial ou étnica, convicção religiosa,
                  opinião política, filiação a sindicato ou a organização de
                  caráter religioso, filosófico ou político, dado referente à
                  saúde ou à vida sexual, dado genético ou biométrico, quando
                  vinculado a uma pessoa natural.
                </TextDescription>
                <SubTitle>4. Cookies</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Cookies são pequenos arquivos de texto baixados
                  automaticamente em seu dispositivo quando você acessa e navega
                  por um aplicativo. Eles servem, basicamente, para que seja
                  possível identificar dispositivos, atividades e preferências
                  de usuários. Os cookies não permitem que qualquer arquivo ou
                  informação sejam extraídos do disco rígido do usuário, não
                  sendo possível, ainda, que, por meio deles, se tenha acesso a
                  informações pessoais que não tenham partido do usuário ou da
                  forma como utiliza os recursos do aplicativo.
                </TextDescription>
                <TextTopicItalic>a. Cookies do aplicativo</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Os cookies do aplicativo só aqueles enviados ao computador ou
                  dispositivo do usuário e administrador exclusivamente pelo
                  aplicativo. As informações coletadas por meio destes cookies
                  são utilizadas para melhorar e personalizar a experiência do
                  usuário, sendo que alguns cookies podem, por exemplo, ser
                  utilizados para lembrar as preferências e escolhas do usuário,
                  bem como para o oferecimento de conteúdo personalizado.
                </TextDescription>
                <TextTopicItalic>b. Cookies de terceiros</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Alguns de nossos parceiros podem configurar cookies nos
                  dispositivos dos usuários que acessam nosso aplicativo. Estes
                  cookies, em geral, visam possibilitar que nossos parceiros
                  possam oferecer seu conteúdo e seus serviços ao usuário que
                  acessa nosso aplicativo de forma personalizada, por meio da
                  obtenção de dados de navegação extraídos a partir de sua
                  interação com o aplicativo. O usuário poderá obter mais
                  informações sobre os cookies de terceiro e sobre a forma como
                  os dados obtidos a partir dele sendo tratados, além de ter
                  acesso a descrição dos cookies utilizados e de suas
                  características, acessando o seguinte link:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Google Analytics: https:/developers.
                  google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hI=pt-br
                  As entidades encarregadas da coleta dos cookies poderão ceder
                  as informações obtidas a terceiros.
                </TextDescription>
                <TextTopicItalic>c. Gestão de cookies</TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  O usuário poderá se opor ao registro de cookies pelo
                  aplicativo, bastando que desative esta opção no seu próprio
                  navegador. Mais informações sobre como fazer isso em alguns
                  dos principais navegadores utilizados hoje podem ser acessadas
                  a partir dos seguintes links:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Internet Explorer:
                  https://support.microsoft.com/pt-br/help/17442/windows-intemnet-explorer-delete-manage-cookies
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Safari:
                  https:/support.apple.com/pt-br/guide/safari/sfri11471/mac
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Google Chrome: https://support.
                  oogle.com/chrome/answer/95647?hI=pt-BR&him=pt
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Mozilla Firefox: https:/support.
                  mozilla.org/pt-BR/kb/ative-e-desative-os-cookies-que-os-aplicativos-usam
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Opera: https://www.opera.com/help/tutorials/security/privacy/
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  A desativação dos cookies, no entanto, pode afetar a
                  disponibilidade de algumas ferramentas e funcionalidades do
                  aplicativo, comprometendo seu correto e esperado
                  funcionamento. Outra consequência possível é remoção das
                  preferências do usuário que eventualmente tiverem sido salvas,
                  prejudicando sua experiência.
                </TextDescription>
                <TextTopicItalic>
                  5. Coleta de dados não previstos expressamente
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Eventualmente, outros tipos de dados não previstos
                  expressamente nesta Política de Privacidade poderão ser
                  coletados, desde que sejam fornecidos com o consentimento do
                  usuário, ou, ainda, que a coleta seja permitida com fundamento
                  em outra base legal prevista em lei. Em qualquer caso, a
                  coleta de dados e as atividades de tratamento dela decorrentes
                  serão informadas aos usuários do aplicativo.
                </TextDescription>
                <SubTitle>
                  2. Compartilhamento de dados pessoais com terceiros
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Nós não compartilhamos seus dados pessoais com terceiros.
                  Apesar disso, é possível que o façamos para cumprir alguma
                  determinação legal ou regulatória, ou, ainda, para cumprir
                  alguma ordem expedida por autoridade pública.
                </TextDescription>
                <SubTitle>
                  3. Por quanto tempo seus dados pessoais serão armazenados
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Os dados pessoais coletados pelo aplicativo são armazenados e
                  utilizados por período de tempo que corresponda ao necessário
                  para atingir as finalidades elencadas neste documento e que
                  considere os direitos de seus titulares, os direitos do
                  controlador do aplicativo e as disposições legais ou
                  regulatórias aplicáveis. Uma vez expirados os períodos de
                  armazenamento dos dados pessoais, eles são removidos de nossas
                  bases de dados ou anonimizados, salvo nos casos em que houver
                  a possibilidade ou a necessidade de armazenamento em virtude
                  de disposição legal ou regulatória.
                </TextDescription>
                <SubTitle>
                  4. Bases legais para o tratamento de dados pessoais
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Cada operação de tratamento de dados pessoais precisa ter um
                  fundamento jurídico, ou seja, uma base legal, que nada mais é
                  que uma justificativa que a autorize, prevista na Lei Geral de
                  Proteção de Dados Pessoais. Todas as nossas atividades de
                  tratamento de dados pessoais possuem uma base legal que as
                  fundamenta, dentre as permitidas pela legislação. Mais
                  informações sobre as bases legais que utilizamos para
                  operações de tratamento de dados pessoais específicas podem
                  ser obtidas a partir de nossos canais de contato, informados
                  ao final desta Política.
                </TextDescription>
                <SubTitle>5. Direitos do titular</SubTitle>
                <TextDescription allowFontScaling={false}>
                  A LGPD garante a todos os titulares direitos sobre seus dados
                  pessoais. De acordo com a Lei, o titular tem direito a
                  requerer:
                </TextDescription>
                <TextTopic>
                  - Confirmação da existência de tratamento de dados pessoais -
                  Direito a saber se a instituição trata ou não seus dados
                  pessoais.
                </TextTopic>
                <TextTopic>
                  - Acesso aos seus dados pessoais - Direito a ter acesso aos
                  dados pessoais que são tratados pela instituição, caso esse
                  tratamento exista.
                </TextTopic>
                <TextTopic>
                  - Correção de dados pessoais incompletos, inexatos ou
                  desatualizados - Direito a ter seus dados sempre completos,
                  corretos e atualizados.
                </TextTopic>
                <TextTopic>
                  - Anonimização, bloqueio ou eliminação de dados
                  desnecessários, excessivos ou tratados em desconformidade com
                  a lei - Direito a ter seus dados pessoais anonimizados
                  (impossibilitar a identificação de um indivíduo através do
                  dado), bloquear seu tratamento ou excluí-los.
                </TextTopic>
                <TextTopic>
                  -Portabilidade dos dados pessoais a outro fornecedor de
                  serviço - Direito a ter seus dados pessoais enviados a outras
                  instituições mediante sua requisição.
                </TextTopic>
                <TextTopicItalic>
                  1. Como o titular pode exercer seus direitos
                </TextTopicItalic>
                <TextDescription allowFontScaling={false}>
                  Para garantir que o usuário que pretende exercer seus direitos
                  é, de fato, titular dos dados pessoais objeto da requisição,
                  poderemos solicitar documentos ou outras informações que
                  possam auxiliar em sua correta identificação, a fim de
                  resguardar nossos direitos e os direitos de terceiros. Isto
                  somente será feito, porém, se for absolutamente necessário, e
                  o requerente receberá todas as informações relacionadas.
                </TextDescription>
                <SubTitle>
                  6. Medidas de segurança no tratamento de dados pessoais
                </SubTitle>
                <TextDescription allowFontScaling={false}>
                  Empregamos medidas técnicas e organizativas aptas a proteger
                  os dados pessoais de acessos não autorizados e de situações de
                  destruição, perda, extravio ou alteração desses dados. As
                  medidas que utilizamos levam em consideração a natureza dos
                  dados, o contexto e a finalidade do tratamento, os riscos que
                  uma eventual violação geraria para os direitos e liberdades do
                  usuário, e os padres atualmente empregados no mercado por
                  empresas semelhantes à nossa.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Entre as medidas de segurança adotadas por nós, destacamos as
                  seguintes:
                </TextDescription>
                <TextTopic>
                  - Os dados de nossos usuários são armazenados em ambiente
                  seguro;
                </TextTopic>
                <TextTopic>
                  - Limitamos o acesso aos dados de nossos usuários, de modo que
                  terceiros não autorizados não o possam acessá-los;
                </TextTopic>
                <TextTopic>
                  - Utilizamos certificado SSL (Secure Socket Layer), de modo
                  que a transmissão de dados entre os dispositivos dos usuários
                  e nossos servidores aconteça de forma criptografada;
                </TextTopic>
                <TextTopic>
                  - Mantemos registros de todos aqueles que têm, de alguma
                  forma, contato com nossos dados.
                </TextTopic>
                <TextDescription allowFontScaling={false}>
                  Ainda que adote tudo o que está ao seu alcance para evitar
                  incidentes de segurança, é possível que ocorra algum problema
                  motivado exclusivamente por um terceiro - como em caso de
                  ataques de hackers ou crackers ou, ainda, em caso de culpa
                  exclusiva do usuário, que ocorre, por exemplo, quando ele
                  mesmo transfere seus dados a terceiro. Assim, embora sejamos,
                  em geral, responsáveis pelos dados pessoais que tratamos, nos
                  eximimos de responsabilidade caso ocorra uma situação
                  excepcional como essas, sobre as quais não temos nenhum tipo
                  de controle.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  De qualquer forma, caso ocorra qualquer tipo de incidente de
                  segurança que possa gerar risco ou dano relevante para
                  qualquer de nossos usuários, comunicaremos os afetados e a
                  Autoridade Nacional de Proteção de Dados acerca do ocorrido,
                  em conformidade com o disposto na Lei Geral de Proteção de
                  Dados.
                </TextDescription>
                <SubTitle>7. Alterações nesta política</SubTitle>
                <View style={{ flexDirection: 'row' }}>
                  <TextDescription allowFontScaling={false}>
                    A presente versão desta Política de Privacidade foi
                    atualizada pela última vez em: 07/07/2021.
                  </TextDescription>
                </View>
                <TextDescription allowFontScaling={false}>
                  Reservamo-nos o direito de modificar, a qualquer momento, as
                  presentes normas, especialmente para adaptá-las às eventuais
                  alterações feitas em nosso aplicativo, seja pela
                  disponibilização de novas funcionalidades, seja pela supressão
                  ou modificação daquelas já existentes.
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  Sempre que houver uma modificação, nossos usuários serão
                  notificados acerca da mudança.
                </TextDescription>
                <SubTitle>8. Como entrar em contato conosco</SubTitle>
                <TextDescription allowFontScaling={false}>
                  Para esclarecer quaisquer dúvidas sobre esta Política de
                  Privacidade ou sobre os dados pessoais que tratamos, entre em
                  contato com nosso Encarregado de Proteção de Dados Pessoais,
                  por algum dos canais mencionados abaixo:
                </TextDescription>
                <TextDescription allowFontScaling={false}>
                  E-mail: synopsis.contato@gmail.com
                </TextDescription>
                <SubTitle>Lei aplicável</SubTitle>
                <View
                  style={{
                    marginBottom: Platform.OS === 'android' ? 38 : 16,
                  }}
                >
                  <TextDescription allowFontScaling={false}>
                    Este documento é regido e deve ser interpretado de acordo
                    com as leis da República Federativa do Brasil. Fica eleito o
                    Foro da circunscrição judiciária de Brasília, Distrito
                    Federal, como o competente para dirimir quaisquer questões
                    porventura oriundas do presente documento.
                  </TextDescription>
                </View>
              </ContainerText>
            </ScrollView>
          </MaskedView>
          <View
            style={{
              marginLeft: 16,
              marginTop: 24,
              marginBottom: Platform.OS === 'android' ? 38 : 0,
            }}
          >
            <ButtonPrimary
              navigation={() => navigation.goBack()}
              width="full"
              title="Voltar"
            />
          </View>
        </Container>
      )}
    </>
  );
};

export default Terms;
