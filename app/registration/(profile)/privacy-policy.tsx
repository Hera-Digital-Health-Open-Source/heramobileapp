import { SafeAreaView, View , Text, ScrollView, StyleSheet, Alert} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import { useHttpClient } from "@/context/HttpClientContext";
import { useRouter } from "expo-router";
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { useI18n } from "@/context/I18nContext";
import { useTranslation } from "@/hooks/useTranslation";
import { UserProfile } from "@/interfaces/IUserProfile";

export default function PrivacyPolicy(){
  const [isAccept, setIsAccept] = useState(false);
  const {name, gender, dateOfBirth, setOnBoardingProgress} = useRegistration();
  const {sendRequestFetch} = useHttpClient();
  const { session, idToken } = useAuthStore();
  const { setUserProfile } = useProfileStore();
  const { t, locale } = useTranslation();
  const router = useRouter();

  // const patchUserProfile = async (userProfile: UserProfile) => {
  //   const response = await sendRequestFetch<{}>({
  //     url: `/user_profiles/${userId}/`,
  //     method: "PATCH",
  //     data: userProfile,
  //     headers: {
  //       "Accept-Language": "en",
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: "Token " + session,
  //     },
  //   });

  //   if(response.isTokenExpired){
  //     return router.replace('/auth/login');
  //   }

  //   if (response.error) {
  //     Alert.alert(
  //       t('connection_error_title'),
  //       t('connection_error_message')
  //     );
  //   }
  // };

  const privacyPolicyEn = `REGARDING THE PROTECTION OF PERSONAL DATALIGHTING TEXT

Data Controller,
Title : HERA Inc. (“HERA”)

Address : Hera Inc. 45 Prospect St Cambridge, MA 02139 United States

Contact : info@heradigitalhealth.org

Descriptions :

As HERA, you, within the framework of the legislation on the Protection of Personal Data,

I. Which of your personal data can be processed,
ii. Our personal data collection methods and legal reasons,
iii. For what purpose your personal data can be processed,
iv. To whom and for what purposes your processed personal data can be transferred,
v. Your existing rights under the legislation,

We would like to shed light on the issues as Data Controller. As HERA, we take due care in processing the personal data of our members, volunteers, employees and all other persons who are in contact with us for whatever reason, in accordance with all applicable legislation. The extent to which your personal data may be processed by HERA in the capacity of Data Controller is explained below.


Definitions:

Personal data : Any information relating to an identified or identifiable natural person,

Relevant person : The real person whose personal data is processed,

Data controller : The natural or legal person who determines the purposes and means of processing personal data and is responsible for the establishment and management of the data recording system,

Processing of personal data: Obtaining, recording, storing, preserving, changing, rearranging, disclosing, transferring, taking over, making available personal data in whole or in part by automatic or non-automatic means provided that it is a part of any data recording system, means all kinds of operations performed on data such as classification or prevention of use.

I. Which personal data do we process?

Regarding you or your child under the age of 18

• Name, surname, date of birth, gender information,
• Contact information (work address, home address, e-mail, telephone, mobile phone, etc.)
• Pregnancy period, menstrual date and pregnancy week information
• Vaccination information for you or your child,
• Information you have conveyed to our employees within the scope of your requests and complaints regarding products and services,
• Records of your transactions through our mobile application or www.heradigitalhealth.org

II. What is the method and legal reason for collecting your personal data?


Your personal data, during the establishment of your legal relationship with HERA and during the continuation of the legal relationship, provided that it is from you, third parties and public institutions-organizations; Our “HERA” mobile application is collected and processed in written, verbal, physical or electronic form via telephone and e-mail channels for the purposes and reasons explained below, and when necessary, by taking adequate measures as required by the legislation, to authorized public institutions and organizations, domestic and foreign It can be transferred to our business partners, personnel, 3rd parties we assign and 3rd party service providers.
Your personal data is processed and transferred when necessary, in the presence of the reasons listed below.

• Having your explicit consent,
• It has been made public by you,
• It is clearly stipulated in the legislation to which our association is subject,
• It is necessary to process the personal data of the parties to the contract, provided that it is directly related to the establishment and performance of the contract,
• It is mandatory to fulfill our legal obligations,
• Data processing is mandatory for the establishment, exercise or protection of a right,
• Our legal-legitimate interests necessitate data processing, provided that it does not violate your fundamental rights and freedoms.

III. For what purpose do we process your personal data?


Your collected personal data may be processed by HERA for the following purposes, in accordance with the basic principles stipulated in the legislation and within the personal data processing conditions and reasons:
• Analyzing the health data of our members and users,
• Fulfilling the legal and administrative obligations of our association in accordance with the legislation,
• Answering the requests and questions of our members and users; finalizing the applications,
• To carry out the necessary studies by the relevant units of our Association in order to carry out the social responsibility activities carried out by our Association in accordance with the legislation and the objectives of our Association, and to carry out activities in this direction,
• Determining, planning and implementing the short, medium and long term policies of our association,
• Ensuring the commercial and legal safety of real persons who have a business relationship with our association.

IV. To whom and for what purpose do we transfer your personal data?


As HERA, your personal data in accordance with the provisions of the legislation and limited to the above-mentioned purposes; within the scope of personal data transfer conditions and purposes, provided that adequate measures are taken;

Your feedback regarding our products and services with the relevant personnel, departments and business partners,

With the information you have entered through our “HERA” Mobile application or our website www.heradigitalhealth.org, and your transaction records with our contracted service provider company,

We transfer the name, surname, date of birth, address, telephone data that we need to keep in line with the anonymized health data and our legal obligations, only by sharing them with domestic and foreign software organizations that provide reliable data storage services, provided that they are kept.
As explained above, your personal data is limited to public institutions and organizations, our business partners, our personnel, 3rd parties we have appointed and 3rd party service providers; In cases stipulated by the legislation related to regulatory and supervisory institutions and official authorities, it can be transferred to the country or abroad within the scope of your express consent or within the scope of the legislation, depending on the nature. Care is taken to ensure that the personal data shared in these transfers is limited to the service to be provided, and all measures are taken to protect your transferred personal data as required by the legislation.


V. What are your rights as a data subject?


The rights of natural persons whose personal data are processed are as follows;
• Learning whether personal data is processed or not,
• If personal data has been processed, requesting information about it,
• To learn the purpose of processing personal data and whether they are used in accordance with the purpose,
• Knowing the third parties to whom personal data is transferred in the country or abroad,
• Requesting correction of personal data in case of incomplete or incorrect processing and requesting notification of the transaction made within this scope to the third parties to whom the personal data has been transferred,
• Requesting the deletion or destruction of personal data in the event that the reasons for its processing disappear, and requesting the notification of the transaction made within this scope to the third parties to whom the personal data has been transferred,
• Objecting to the emergence of a result against the person himself by analyzing the processed data exclusively through automated systems,
• Requesting the compensation of the damage in case of loss due to unlawful processing of personal data.

You can send your requests regarding your rights listed above to the e-mail address of our Association (info@heradigitalhealth.org) or to “Hera Inc. 45 Prospect St Cambridge, MA 02139 United States”, your request will be finalized as soon as possible depending on the nature of your request.`;

  const privacyPolicyTr = `KİŞİSEL VERİLERİN KORUNMASINA İLİŞKİN AYDINLATMA METNİ

Veri Sorumlusunun,

Unvanı                                                                         : HERA Inc. (“HERA”)

Adres                                                                            : Hera Inc. 45 Prospect St Cambridge, MA 02139 United States

İletişim                                                                        : info@heradigitalhealth.org

Açıklamalar                                          :

Kişisel Verilerin Korunmasına ilişkin mevzuat çerçevesinde, HERA olarak sizleri,

Hangi kişisel verilerinizin işlenebileceği,
Kişisel veri toplama yöntemlerimiz ve hukuki sebepleri,
Kişisel verilerinizin hangi amaçla işlenebileceği,
İşlenen kişisel verilerinizin kimlere ve hangi amaçlarla aktarılabileceği,
Mevzuat kapsamında mevcut haklarınız,
konularında Veri Sorumlusu sıfatıyla aydınlatmak isteriz. HERA olarak, üyelerimizin, gönüllülerimizin, çalışanlarımızın ve her ne sebeple olursa olsun bizimle iletişim halinde olan diğer tüm ilgililerin kişisel verilerinin yürürlükteki tüm mevzuata uygun olarak işlenmesinde gereken özeni göstermekteyiz. Kişisel verilerinizin, Veri Sorumlusu sıfatıyla HERA tarafından hangi kapsamda işlenebileceği aşağıda açıklanmıştır.

Tanımlar                                                :

Kişisel veri                                             : Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi,

İlgili kişi                                                   : Kişisel verisi işlenen gerçek kişiyi,

Veri sorumlusu                                   : Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiyi,

Kişisel verilerin işlenmesi         : Kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması, devralınması, elde edilebilir hâle getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlemi ifade eder.

I. Hangi kişisel verilerinizi işliyoruz?

Tarafınıza ya da 18 yaşın altındaki çocuğunuza ilişkin

İsim, soy-isim, doğum tarihi, cinsiyet bilgileri,
İletişim bilgileri (iş yeri adresi, ev adresi, e-posta, telefon, cep telefonu vb.)
Gebelik dönemi, regl tarihi ve hamilelik haftası bilgileri
Tarafınıza ya da çocuğunuza yapılan aşı bilgileri,
Ürün ve hizmetlere ilişkin talep ve şikâyetleriniz kapsamında çalışanlarımıza iletmiş olduğunuz bilgiler,
Mobil uygulamamız ya da www.heradigitalhealth.org üzerinden yaptığınız işlemlere ilişkin kayıtlar.
II. Kişisel verilerinizi toplamamızın yöntemi ve hukuki sebebi nedir?

Kişisel verileriniz, HERA ile hukuki ilişkinizin kurulması esnasında ve hukuki ilişkinin devamı süresince sizlerden, üçüncü kişilerden ve kamu kurum-kuruluşlarından olmak kaydıyla; “HERA” mobil uygulamamız, telefon, e-posta kanalları aracılığıyla yazılı, sözlü, fiziki veya elektronik olarak  aşağıda açıklanan amaçlar ve sebepler dahilinde toplanmakta, işlenmekte ve gerektiğinde niteliğine göre mevzuat gereği yeterli önlemler alınarak yetkili kamu kurum ve kuruluşlarına, yurt içi ve yurt dışındaki iş ortaklarımıza, personelimize, görevlendirdiğimiz 3. Kişilere ve 3. Kişi hizmet sağlayıcılarına aktarılabilmektedir.

Kişisel verileriniz aşağıda sayılan sebeplerin varlığı halinde işlenmekte ve gerektiğinde aktarılmaktadır.

Açık rızanızın bulunması,
Tarafınızca alenileştirilmiş olması,
Derneğimizin tabi olduğu mevzuatlarda açıkça öngörülmüş olması,
Sözleşmenin kurulması ve ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması,
Hukuki yükümlülüklerimizi yerine getirebilmek için zorunlu olması,
Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması,
Temel hak ve özgürlüklerinizi ihlal etmemek kaydıyla hukuki-meşru menfaatlerimizin veri işlemeyi zorunlu kılması.
III. Kişisel verilerinizi hangi amaçla işliyoruz?

Toplanan kişisel verileriniz, mevzuatta öngörülen temel ilkelere uygun olarak ve kişisel veri işleme şartları ve sebepleri dahilinde, HERA tarafından aşağıda yer alan amaçlarla işlenebilmektedir:

Üyelerimizin ve kullanıcılarımızın sağlık verilerinin analizinin gerçekleştirilmesi,
Derneğimizin yasal ve idari yükümlülüklerinin mevzuata uygun olarak yerine getirilmesi,
Üyelerimizin ve kullanıcılarımızın talep ve sorularının cevaplanması; başvurularının sonuçlandırılması,
Derneğimizin yürüttüğü sosyal sorumluluk faaliyetlerinin mevzuata ve Derneğimiz amaçlarına uygun olarak yerine getirilmesi için Derneğimizin ilgili birimleri tarafından gerekli çalışmaların yapılması ve bu doğrultuda faaliyetlerin yürütülmesi,
Derneğimizin kısa, orta ve uzun vadede politikalarının tespit edilmesi, planlanması ve uygulanması,
Derneğimiz ile iş ilişkisi içerisinde olan gerçek kişilerin ticari ve hukuki emniyetinin sağlanması.
IV. Kişisel verilerinizi kimlere ve hangi amaçla aktarıyoruz?

HERA olarak, mevzuat hükümlerine uygun bir şekilde ve yukarıda belirtilen amaçlarla sınırlı olmak üzere kişisel verilerinizi; kişisel veri aktarma şartları ve amaçları dâhilinde, yeterli önlemleri almak kaydıyla;

Ürün ve hizmetlerimize ilişkin geri dönüşlerinizi ilgili personel, departman ve iş ortaklarımızla,
“HERA” Mobil uygulamamız ya da www.heradigitalhealth.org internet sitemiz üzerinden girmiş olduğunuz bilgiler ile yaptığınız işlem kayıtlarınızı, anlaşmalı hizmet sağlayıcı firmamızla,
Anonim hale getirilen sağlık verileri ve yasal yükümlülüklerimiz doğrultusunda muhafaza etmemiz gereken isim, soy-isim, doğum tarihi, adres, telefon verilerini yalnızca muhafaza edilmesi kaydıyla güvenilir veri depolama hizmeti sağlayan yerli ve yabancı yazılım kuruluşlarıyla paylaşmak suretiyle aktarmaktayız.
Yukarıda izah edildiği üzere kişisel verileriniz, kamu kurum ve kuruluşları, iş ortaklarımız, personelimiz, görevlendirdiğimiz 3. Kişiler ve 3. Kişi hizmet sağlayıcıları ile sınırlı olmak kaydı ile; düzenleyici ve denetleyici kurumlar ve resmi mercilerle ilgili mevzuatın öngördüğü durumlarda niteliğine göre açık rızanız dahilinde yahut mevzuatın öngördüğü haller kapsamında yurt içine veya yurt dışına aktarılabilecektir. Bu aktarımlarda paylaşılan kişisel verilerin verilecek hizmetle sınırlı olmasına özen gösterilir ve aktarılan kişisel verilerinizin mevzuatın gerektirdiği şekilde korunması için tüm tedbirler alınır.

V. Veri sahibi olarak haklarınız nelerdir?

Kişisel verisi işlenen gerçek kişilerin sahip olduğu haklar aşağıdaki gibidir;

Kişisel verilerinin işlenip işlenmediğini öğrenme,
Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,
Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,
Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,
Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.
Yukarıda sayılan haklarınıza ilişkin taleplerinizi Derneğimize ait e-posta adresine ( info@heradigitalhealth.org) yahut “Hera Inc. 45 Prospect St Cambridge, MA 02139 United States” mektup adresine iletmeniz durumunda tarafımızca talebiniz niteliğine göre en kısa sürede sonuçlandırılacaktır.`;

  const privacyPolicyAr = `بخصوص حماية البيانات الشخصية – نص إيضاحي
مسؤول معالجة البيانات

الاسم/الصفة: شركة هيرا (HERA Inc.)
العنوان: Hera Inc.، 45 Prospect St، كامبريدج، MA 02139، الولايات المتحدة الأمريكية
بيانات الاتصال: info@heradigitalhealth.org

تمهيد

بصفتنا "هيرا"، وضمن الإطار التشريعي المتعلق بحماية البيانات الشخصية، نحيطكم علماً بما يلي:

ماهية بياناتكم الشخصية التي يمكن معالجتها،

طرق جمع بياناتكم الشخصية والأسس القانونية لذلك،

الأغراض التي تتم من أجلها معالجة بياناتكم الشخصية،

الجهات التي قد تُنقل إليها بياناتكم الشخصية والأغراض من وراء ذلك،

الحقوق المقررة لكم بموجب التشريعات ذات الصلة.

وبصفتنا مسؤول معالجة البيانات، فإننا في "هيرا" نولي عناية قصوى بمعالجة البيانات الشخصية الخاصة بأعضائنا، متطوعينا، موظفينا وجميع الأشخاص الذين تجمعنا بهم علاقة لأي سبب كان، وذلك بما يتوافق مع التشريعات النافذة. ويُوضح أدناه نطاق معالجة بياناتكم الشخصية من قبل "هيرا" بصفتها مسؤول معالجة البيانات.

التعريفات

البيانات الشخصية: أي معلومة تتعلق بشخص طبيعي مُحدد الهوية أو قابل للتحديد.

الشخص المعني: الشخص الطبيعي الذي تتم معالجة بياناته الشخصية.

مسؤول معالجة البيانات: الشخص الطبيعي أو الاعتباري الذي يحدد أغراض ووسائل معالجة البيانات الشخصية ويتحمل مسؤولية إنشاء وإدارة نظام تسجيل البيانات.

معالجة البيانات الشخصية: تشمل جمع، تسجيل، تخزين، حفظ، تعديل، إعادة تنظيم، إفشاء، نقل، استلام، إتاحة، أو القيام بأي شكل من أشكال المعالجة على البيانات كلياً أو جزئياً بوسائل آلية أو غير آلية، شريطة أن تكون جزءاً من نظام لتسجيل البيانات، بما في ذلك تصنيفها أو تقييد استخدامها.

أولاً: البيانات الشخصية محل المعالجة

الاسم، اللقب، تاريخ الميلاد، الجنس،

بيانات التواصل (عنوان العمل، عنوان السكن، البريد الإلكتروني، الهاتف، الهاتف المحمول...)،

بيانات فترة الحمل، تاريخ الدورة الشهرية، وأسبوع الحمل،

بيانات التطعيم الخاصة بكم أو بطفلكم،

المعلومات المقدمة من قبلكم لموظفينا ضمن نطاق الطلبات أو الشكاوى المتعلقة بالمنتجات والخدمات،

سجلات المعاملات التي قمتم بها عبر تطبيقنا "HERA" أو موقعنا الإلكتروني www.heradigitalhealth.org
.

ثانياً: طريقة وأساس جمع البيانات الشخصية

تُجمع بياناتكم الشخصية أثناء إنشاء العلاقة القانونية مع "هيرا" وخلال استمرارها، سواء منكم مباشرة أو من أطراف ثالثة أو من مؤسسات وهيئات عامة، وذلك عبر تطبيق "هيرا" وبالوسائل المكتوبة أو الشفهية أو المادية أو الإلكترونية (الهاتف والبريد الإلكتروني).

الأسس القانونية تشمل:

الحصول على موافقتكم الصريحة،

كون البيانات متاحة للعموم من قبلكم،

النص عليها صراحة في التشريعات النافذة،

ضرورتها لإنشاء أو تنفيذ عقد تكونون طرفاً فيه،

وجوب معالجتها للوفاء بالالتزامات القانونية،

ضروريتها لإثبات أو ممارسة أو حماية حق قانوني،

لزومها لتحقيق المصلحة المشروعة للجمعية شريطة عدم تعارضها مع حقوقكم وحرياتكم الأساسية.

ثالثاً: أغراض معالجة البيانات الشخصية

تحليل البيانات الصحية للأعضاء والمستخدمين،

الامتثال للالتزامات القانونية والإدارية،

الرد على طلبات واستفسارات الأعضاء والمستخدمين وإنهاء معاملاتهم،

تنفيذ أنشطة المسؤولية الاجتماعية الخاصة بالجمعية،

وضع وتخطيط وتنفيذ السياسات القصيرة والمتوسطة والطويلة الأجل للجمعية،

ضمان السلامة القانونية والتجارية للأشخاص ذوي العلاقة مع الجمعية.

رابعاً: نقل البيانات الشخصية

تُعالج وتُنقل بياناتكم، ضمن حدود الأغراض المذكورة أعلاه، وبما يتوافق مع القوانين، إلى:

الموظفين، الأقسام المختصة، وشركاء العمل المرتبطين بخدماتنا ومنتجاتنا،

مزوّدي الخدمات المتعاقدين معنا فيما يخص تطبيق "هيرا" أو موقعنا الإلكتروني،

مؤسسات برمجية محلية أو دولية تقدّم خدمات تخزين بيانات آمنة للبيانات المجهولة الهوية.

كما يمكن نقل البيانات، في الحالات المنصوص عليها قانوناً أو بموجب موافقتكم، إلى السلطات الرقابية أو القضائية المختصة داخل الدولة أو خارجها، مع اتخاذ التدابير الكفيلة بحماية البيانات المنقولة.

خامساً: حقوق أصحاب البيانات

العلم بما إذا كانت بياناتهم الشخصية قد تمت معالجتها من عدمه،

طلب الحصول على معلومات في حال تمت معالجتها،

العلم بأغراض معالجتها وما إذا جرى استخدامها وفقاً لتلك الأغراض،

العلم بالجهات التي نُقلت إليها داخل الدولة أو خارجها،

طلب تصحيح البيانات غير الدقيقة أو الناقصة، وإشعار الجهات التي نُقلت إليها،

طلب حذف أو إتلاف البيانات عند زوال أسباب معالجتها، مع إشعار الجهات التي نُقلت إليها،

الاعتراض على النتائج الضارة الناشئة عن المعالجة عبر الأنظمة الآلية،

المطالبة بالتعويض عن الأضرار الناجمة عن معالجة البيانات بشكل غير مشروع.

آلية ممارسة الحقوق

يمكنكم إرسال طلباتكم المتعلقة بالحقوق أعلاه إلى البريد الإلكتروني: info@heradigitalhealth.org

أو إلى العنوان: Hera Inc.، 45 Prospect St، كامبريدج، MA 02139، الولايات المتحدة الأمريكية.

وسيتم البت في طلباتكم بأسرع وقت ممكن وفقاً لطبيعتها.`;

  const privacyPolicy = locale === 'ar' ? privacyPolicyAr : locale === 'tr' ? privacyPolicyTr : privacyPolicyEn;

  const handleContinue = async () => {
    const profile = {
      name: name!,
      gender: gender?.toUpperCase() as 'MALE' | 'FEMALE',
      date_of_birth: dateOfBirth!.toISOString().split("T")[0],
      language_code: locale as 'tr' | 'en' | 'ar',
      agree_to_terms_at: new Date().toISOString().split("T")[0],
      time_zone: 'UTC'
    };

    const response = await sendRequestFetch<{}>({
      url: '/user_profiles/',
      method: 'POST',
      data: profile,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + session!,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if(response.error){
      console.log(response.error)
    }

    if(response.data){
      await updateOnboardingProgresses();
      // const p = {
      //   name: name!,
      //   gender: gender?.toUpperCase() as 'MALE' | 'FEMALE',
      //   date_of_birth: dateOfBirth!.toISOString().split("T")[0],
      //   language_code: locale as 'tr' | 'en' | 'ar',
      //   time_zone: 'UTC',
      // }

      // await patchUserProfile(p);

      setUserProfile(profile);

      router.replace('/registration/pregnancy-yes-no');
    }
  };

  const updateOnboardingProgresses = async () => {
    const response = await sendRequestFetch<{}>({
      url: '/onboarding_progresses/',
      method: 'POST',
      data: {
        has_filled_profile: true,
        has_filled_pregnancy_status: true, // No need to remember if user has filled this info
        has_filled_children_info: true, // No need to remember if user has filled this info
      },
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + session!,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if(response.error){
      console.log(response.error)
    }
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={GlobalStyles.HeadingText}>{t('privacy_policy_toolbar_title')}</Text>
        <ScrollView>
          <Text style={[GlobalStyles.NormalText, {textAlign: 'justify'}]}>{privacyPolicy}</Text>
          <CheckBox label={t('complete_profile_screen_privacy_policy_description')} initIsChecked={false} onChange={(v)=>{setIsAccept(v)}}/>
          <View style={{width: '100%', height: 80}} />
        </ScrollView>
        <Button 
          style={styles.continueButton}
          buttonType={isAccept ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
          label="Continue"
          onPress={isAccept ? () => handleContinue() : () => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    gap: Spacing.large,
    marginTop: Spacing.xxlarge,
    backgroundColor: '#fff',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
  }
});