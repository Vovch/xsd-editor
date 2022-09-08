export const testText = `<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2005 rel. 3 U (http://www.altova.com) by any (Ru-Board) -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
    <!-- =================================================== -->
    <!--Типы для ЭЦП согласно cтандарту W3C-->
    <!-- =================================================== -->
    <xs:simpleType name="anyURI_t">
        <xs:annotation>
            <xs:documentation>единообразный идентификатор ресурса</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:anyURI"/>
    </xs:simpleType>
    <xs:simpleType name="SID_t">
        <xs:annotation>
            <xs:documentation>идентификатор</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:ID"/>
    </xs:simpleType>
    <xs:simpleType name="CryptoBinary">
        <xs:annotation>
            <xs:documentation>base64Binary</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:base64Binary"/>
    </xs:simpleType>
    <xs:simpleType name="int_t">
        <xs:annotation>
            <xs:documentation>integer</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:integer"/>
    </xs:simpleType>
    <!-- =================================================== -->
    <xs:complexType name="SignatureEnvelope">
        <xs:sequence>
            <xs:any namespace="http://www.w3.org/2000/09/xmldsig#" processContents="lax"/>
        </xs:sequence>
    </xs:complexType>
    <xs:complexType name="SignatureType">
        <xs:annotation>
            <xs:documentation>Блок ЭЦП</xs:documentation>
        </xs:annotation>
        <xs:sequence>
            <xs:element name="SignedInfo" type="SignedInfoType">
                <xs:annotation>
                    <xs:documentation>информация о содержимом приложения</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="SignatureValue" type="SignatureValueType">
                <xs:annotation>
                    <xs:documentation>содержит подпись, которая охватывает только элемент SignedInfo: в хэш подписи включено только содержимое SignedInfo</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="KeyInfo" type="KeyInfoType" minOccurs="0">
                <xs:annotation>
                    <xs:documentation>идентифицирует подписавшую сторону или, по крайней мере, ключ, который сгенерировал подпись (или, говоря на языке криптографии, ключ, который защищает хэш от изменений)</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="Object" type="ObjectType" minOccurs="0" maxOccurs="unbounded">
                <xs:annotation>
                    <xs:documentation>метаданные для подписанного "настоящего" содержимого</xs:documentation>
                </xs:annotation>
            </xs:element>
        </xs:sequence>
        <xs:attribute name="Id" type="SID_t" use="optional">
            <xs:annotation>
                <xs:documentation>идентификатор, обеспечивающий множественность подписей</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="SignatureValueType">
        <xs:simpleContent>
            <xs:extension base="CryptoBinary">
                <xs:attribute name="Id" type="SID_t" use="optional">
                    <xs:annotation>
                        <xs:documentation>идентификатор</xs:documentation>
                    </xs:annotation>
                </xs:attribute>
            </xs:extension>
        </xs:simpleContent>
    </xs:complexType>
    <!-- Start SignedInfo -->
    <xs:complexType name="SignedInfoType">
        <xs:sequence>
            <xs:element name="CanonicalizationMethod" type="CanonicalizationMethodType">
                <xs:annotation>
                    <xs:documentation>метод канонизации</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="SignatureMethod" type="SignatureMethodType">
                <xs:annotation>
                    <xs:documentation>определяет, какой тип подписи используется для создания подписи</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="Reference" type="ReferenceType" maxOccurs="unbounded">
                <xs:annotation>
                    <xs:documentation>он включает хэш содержимого, свидетельство того, что хэш был создан (например, SHA1), и определение того, как содержимое должно быть трансформировано перед генерированием хэша</xs:documentation>
                </xs:annotation>
            </xs:element>
        </xs:sequence>
        <xs:attribute name="Id" type="SID_t" use="optional">
            <xs:annotation>
                <xs:documentation>идентификатор</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="CanonicalizationMethodType" mixed="true">
        <xs:sequence>
            <xs:any namespace="##any" minOccurs="0" maxOccurs="unbounded"/>
            <!-- (0,unbounded) elements from (1,1) namespace -->
        </xs:sequence>
        <xs:attribute name="Algorithm" type="anyURI_t" use="required">
            <xs:annotation>
                <xs:documentation>значение: http://www.w3.org/TR/2001/REC-xml-c14n-20010315</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="SignatureMethodType" mixed="true">
        <xs:sequence>
            <xs:element name="HMACOutputLength" type="HMACOutputLengthType" minOccurs="0"/>
            <xs:any namespace="##other" minOccurs="0" maxOccurs="unbounded"/>
            <!-- (0,unbounded) elements from (1,1) external namespace -->
        </xs:sequence>
        <xs:attribute name="Algorithm" type="anyURI_t" use="required">
            <xs:annotation>
                <xs:documentation>значение (российский ГОСТ): http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <!-- Start Reference -->
    <xs:complexType name="ReferenceType">
        <xs:sequence>
            <xs:element name="Transforms" type="TransformsType" minOccurs="0">
                <xs:annotation>
                    <xs:documentation>определяет упорядоченный список операций, которые были произведены над описываемый ресурсом, прежде чем для него был рассчитан хеш</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="DigestMethod" type="DigestMethodType">
                <xs:annotation>
                    <xs:documentation>определяет алгоритм хэширования</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="DigestValue" type="DigestValueType">
                <xs:annotation>
                    <xs:documentation>Base64-значение хэша содержимого</xs:documentation>
                </xs:annotation>
            </xs:element>
        </xs:sequence>
        <xs:attribute name="Id" type="SID_t" use="optional">
            <xs:annotation>
                <xs:documentation>идентификатор</xs:documentation>
            </xs:annotation>
        </xs:attribute>
        <xs:attribute name="URI" type="anyURI_t" use="optional">
            <xs:annotation>
                <xs:documentation>указывает на фактическое содержимое, к которому обращаются</xs:documentation>
            </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Type" type="anyURI_t" use="optional">
            <xs:annotation>
                <xs:documentation>обеспечивает подсказку при обработке</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="TransformsType">
        <xs:sequence>
            <xs:element name="Transform" type="TransformType" maxOccurs="unbounded"/>
        </xs:sequence>
    </xs:complexType>
    <xs:complexType name="TransformType" mixed="true">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:any namespace="##other" processContents="lax"/>
            <!-- (1,1) elements from (0,unbounded) namespaces -->
            <xs:element name="XPath" type="xs:string">
                <xs:annotation>
                    <xs:documentation>преобразование, которое облегчает подписание части документа, например, подписание только разметки при игнорировании всего текста</xs:documentation>
                </xs:annotation>
            </xs:element>
        </xs:choice>
        <xs:attribute name="Algorithm" type="anyURI_t" use="required">
            <xs:annotation>
                <xs:documentation>значения: http://www.w3.org/2000/09/xmldsig#enveloped-signature и http://www.w3.org/TR/2001/REC-xml-c14n-20010315</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <!-- End Reference -->
    <xs:complexType name="DigestMethodType" mixed="true">
        <xs:sequence>
            <xs:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
        </xs:sequence>
        <xs:attribute name="Algorithm" type="anyURI_t" use="required">
            <xs:annotation>
                <xs:documentation>значение (российский ГОСТ): http://www.w3.org/2001/04/xmldsig-more#gostr3411</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:simpleType name="DigestValueType">
        <xs:restriction base="CryptoBinary"/>
    </xs:simpleType>
    <!-- End SignedInfo -->
    <!-- Start KeyInfo -->
    <xs:complexType name="KeyInfoType" mixed="true">
        <xs:choice maxOccurs="unbounded">
            <xs:element name="KeyName" type="xs:string">
                <xs:annotation>
                    <xs:documentation>К обычным значениям KeyName относятся адрес электронной почты или элемент справочника</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="KeyValue" type="KeyValueType"/>
            <xs:element name="RetrievalMethod" type="RetrievalMethodType"/>
            <xs:element name="X509Data" type="X509DataType">
                <xs:annotation>
                    <xs:documentation>поддержка сертификатов X.509 </xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="PGPData" type="PGPDataType"/>
            <xs:element name="SPKIData" type="SPKIDataType"/>
            <xs:element name="MgmtData" type="xs:string"/>
            <xs:any namespace="##other" processContents="lax"/>
            <!-- (1,1) elements from (0,unbounded) namespaces -->
        </xs:choice>
        <xs:attribute name="Id" type="SID_t" use="optional">
            <xs:annotation>
                <xs:documentation>идентификатор</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="KeyValueType" mixed="true">
        <xs:choice>
            <xs:element name="DSAKeyValue" type="DSAKeyValueType"/>
            <xs:element name="RSAKeyValue" type="RSAKeyValueType"/>
            <xs:any namespace="##other" processContents="lax"/>
        </xs:choice>
    </xs:complexType>
    <xs:complexType name="RetrievalMethodType">
        <xs:sequence>
            <xs:element name="Transforms" type="TransformsType" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="URI" type="anyURI_t"/>
        <xs:attribute name="Type" type="anyURI_t" use="optional"/>
    </xs:complexType>
    <!-- Start X509Data -->
    <xs:complexType name="X509DataType">
        <xs:sequence maxOccurs="unbounded">
            <xs:choice>
                <xs:element name="X509IssuerSerial" type="X509IssuerSerialType">
                    <xs:annotation>
                        <xs:documentation>имя пользователя и серийный номер</xs:documentation>
                    </xs:annotation>
                </xs:element>
                <xs:element name="X509SKI" type="CryptoBinary">
                    <xs:annotation>
                        <xs:documentation>идентификатор ключа</xs:documentation>
                    </xs:annotation>
                </xs:element>
                <xs:element name="X509SubjectName" type="xs:string">
                    <xs:annotation>
                        <xs:documentation>имя субъекта</xs:documentation>
                    </xs:annotation>
                </xs:element>
                <xs:element name="X509Certificate" type="CryptoBinary">
                    <xs:annotation>
                        <xs:documentation>сертификат</xs:documentation>
                    </xs:annotation>
                </xs:element>
                <xs:element name="X509CRL" type="CryptoBinary">
                    <xs:annotation>
                        <xs:documentation>текущая копия Списка отзыва сертификата (Certificate Revocation List - CRL)</xs:documentation>
                    </xs:annotation>
                </xs:element>
                <xs:any namespace="##other" processContents="lax"/>
            </xs:choice>
        </xs:sequence>
    </xs:complexType>
    <xs:complexType name="X509IssuerSerialType">
        <xs:sequence>
            <xs:element name="X509IssuerName" type="xs:string">
                <xs:annotation>
                    <xs:documentation>имя пользователя</xs:documentation>
                </xs:annotation>
            </xs:element>
            <xs:element name="X509SerialNumber" type="int_t">
                <xs:annotation>
                    <xs:documentation>серийный номер</xs:documentation>
                </xs:annotation>
            </xs:element>
        </xs:sequence>
    </xs:complexType>
    <!-- End X509Data -->
    <!-- Begin PGPData -->
    <xs:complexType name="PGPDataType">
        <xs:choice>
            <xs:sequence>
                <xs:element name="PGPKeyID" type="CryptoBinary"/>
                <xs:element name="PGPKeyPacket" type="CryptoBinary" minOccurs="0"/>
                <xs:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
            </xs:sequence>
            <xs:sequence>
                <xs:element name="PGPKeyPacket" type="CryptoBinary"/>
                <xs:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
            </xs:sequence>
        </xs:choice>
    </xs:complexType>
    <!-- End PGPData -->
    <!-- Begin SPKIData -->
    <xs:complexType name="SPKIDataType">
        <xs:sequence maxOccurs="unbounded">
            <xs:element name="SPKISexp" type="CryptoBinary"/>
            <xs:any namespace="##other" processContents="lax" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
    <!-- End SPKIData -->
    <!-- End KeyInfo -->
    <!-- Start Object -->
    <xs:complexType name="ObjectType" mixed="true">
        <xs:sequence minOccurs="0" maxOccurs="unbounded">
            <xs:any namespace="##any" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
        </xs:sequence>
        <xs:attribute name="Id" type="SID_t" use="optional">
            <xs:annotation>
                <xs:documentation>идентификатор</xs:documentation>
            </xs:annotation>
        </xs:attribute>
        <xs:attribute name="MimeType" type="xs:string" use="optional">
            <xs:annotation>
                <xs:documentation>для идентификации данных</xs:documentation>
            </xs:annotation>
        </xs:attribute>
        <xs:attribute name="Encoding" type="anyURI_t" use="optional">
            <xs:annotation>
                <xs:documentation>определяет, как подготовить содержимое к обработке; на данное время определено только кодирование base-64</xs:documentation>
            </xs:annotation>
        </xs:attribute>
    </xs:complexType>
    <!-- End Object -->
    <!-- Start Algorithm Parameters -->
    <xs:simpleType name="HMACOutputLengthType">
        <xs:restriction base="int_t"/>
    </xs:simpleType>
    <!-- Start KeyValue Element-types -->
    <xs:complexType name="DSAKeyValueType">
        <xs:sequence>
            <xs:sequence minOccurs="0">
                <xs:element name="P" type="CryptoBinary"/>
                <xs:element name="Q" type="CryptoBinary"/>
            </xs:sequence>
            <xs:element name="G" type="CryptoBinary" minOccurs="0"/>
            <xs:element name="Y" type="CryptoBinary"/>
            <xs:element name="J" type="CryptoBinary" minOccurs="0"/>
            <xs:sequence minOccurs="0">
                <xs:element name="Seed" type="CryptoBinary"/>
                <xs:element name="PgenCounter" type="CryptoBinary"/>
            </xs:sequence>
        </xs:sequence>
    </xs:complexType>
    <xs:complexType name="RSAKeyValueType">
        <xs:sequence>
            <xs:element name="Modulus" type="CryptoBinary"/>
            <xs:element name="Exponent" type="CryptoBinary"/>
        </xs:sequence>
    </xs:complexType>
    <!-- End KeyValue Element-types -->
    <!-- Конец блока составных типов для ЭЦП -->
</xs:schema>

`