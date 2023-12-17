# Aplicação para o Estudo de Caso

Este repositório contém uma api simples para ser usada em uma aplicação mobile que contem apenas a feature de autenticação desenvolvida com o objetivo de aplicar e analisar requisitos de segurança conforme especificados no documento `OWASP Mobile Application Security Verification Standard (MASVS)`.

A aplicação foi desenvolvida em Nestjs.

## Requisitos Aplicados:

| ID        | Descrição                                                                                        |
|-----------|--------------------------------------------------------------------------------------------------|
| ARCH-2    | Controles de segurança aplicados nos terminais remotos, não apenas no lado do cliente.           |
| ARCH-3    | Arquitetura de alto nível definida para o aplicativo e seus terminais remotos, abordando a segurança. |
| ARCH-4    | Todas as informações sigilosas dentro da aplicação são claramente identificadas.                |
| STORAGE-1 | Recursos de armazenamento de credenciais usados para dados sensíveis, como dados pessoais, credenciais de usuário ou chaves criptográficas. |
| STORAGE-3 | Dados sensíveis não devem ser mostrados nos logs da aplicação.                                    |
| STORAGE-5 | Cache desabilitado para entradas de usuário que são dados sensíveis.                               |
| STORAGE-7 | Dados sensíveis, como senhas ou PINs, não podem ser exibidos na interface de usuário.            |
| CRYPTO-1  | Aplicação não baseada exclusivamente em criptografia simétrica com chaves fixas no código fonte.  |
| CRYPTO-2  | Implementações primitivas de criptografia comprovadas na aplicação.                               |
| CRYPTO-3  | Utilização de primitivas criptográficas adequadas para as regras de negócio, ajustadas conforme as melhores práticas da indústria. |
| AUTH-3    | Se autenticação baseada em token sem estado for utilizada, o servidor deve fornecer um token assinado com algoritmo seguro. |
| AUTH-4    | O endpoint remoto deve encerrar a sessão existente quando o usuário efetua logout.               |
| AUTH-5    | Política de senha estabelecida e implementada no terminal remoto.                                 |
| AUTH-6    | Mecanismo implementado no terminal remoto para proteção contra envios exagerados de credenciais. |
| AUTH-7    | Sessões são invalidadas e tokens de acesso expirados após período predefinido de inatividade do usuário. |
| AUTH-12   | Formas de autorização aplicadas no terminal remoto utilizado pela aplicação.                     |
| PLATFORM-2| Verificação de todas as entradas do usuário e fontes externas, incluindo dados da interface, URLs personalizadas e origens de rede. |
| CODE-5    | Identificação e verificação de componentes de terceiros (bibliotecas, frameworks) em relação a vulnerabilidades conhecidas na aplicação. |
