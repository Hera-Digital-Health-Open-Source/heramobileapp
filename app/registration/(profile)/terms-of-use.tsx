import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";

export default function TermsOfUse(){
  const router = useRouter();
  const [isAccept, setIsAccept] = useState(false);
  const { t, locale } = useTranslation();

  const termsOfUseEn = `“HERA” User Agreement

1.Parties
1.1. This user agreement applies to Hera Inc. 45 Prospect St Cambridge, MA 02139 United States. (Application Owner) and the person (User) who registered for the HERA mobile application, and it has been concluded and entered into force mutually when the user who uses the application completes the membership registration within the scope of the contract and approves in electronic environment that he has read, understood and accepted this agreement.

2.Subject of the Contract
2.1 The subject of this agreement is the determination of the services offered in the HERA mobile application, the ownership and all rights of which belong to HERA Inc., the terms of benefiting from these services, and the mutual rights and obligations of the parties.

3.Definitions
3.1 Mobile application: The name of the mobile application in question is ‘HERA (Health Recording Application)’ and the mobile application named HERA refers to the mobile application software running on all mobile devices and the services offered in connection with this software. HERA provides antenatal care increase, vaccination increase, follow-up, etc. for refugee women and their children under the age of 18. It is a mobile health application developed for
3.2 Member/User: Refers to all persons who register for the mobile application in the ways and methods determined in this contract and benefit from the services provided by the mobile application within the conditions specified in this contract.
3.3 Tools for accessing the application: Information that is only available to the user, such as the user’s account management page, the user name and password providing access to the application.
3.4 Services: It refers to all transactions that users will benefit from thanks to the HERA application, which is included in article 4 of the contract.
3.5 Communication channels: Refers to the application and instant notification communication channel.
3.6 Personal information/confidential information: Person’s name, surname, address, phone number, e-mail address, answers to questions asked about the user’s health in order to perform the service provided with the application, photos of health reports that the user can add to the application at his own will, any and all kinds of information to identify the user. It refers to written and visual signs and information.

4.Rights and Obligations
4.1 Rights and Obligations of the Medical Search and Rescue Association
4.1.1 Medical Search and Rescue Association will provide the services it undertakes upon the request of the user through HERA. Services undertaken by HERA; In order to improve and follow-up the antenatal care and vaccination services of refugee women and their children under the age of 18, sending instant notifications before the control dates, sharing health information about pregnancy and children, advice on these issues, a platform where users can store electronic health records. to present this information and to enable them to see this information only at their own will when requested.
4.1.2 The information and health contents provided by the application owner are only advisory and are not intended for diagnosis or treatment. The user cannot show the owner of the application responsible for any medical, social and legal issues that may arise regarding the use of the application and the shared recommendations. In addition, the owner of the application; does not guarantee the uninterrupted provision of the application 24 hours a day, 7 days a week, and does not make any commitment to service or performance level in this regard. The effective use of the application and all the consequences of this use are the responsibility of the user and HERA Inc. It is not responsible in any way if the expected results of the application are not complete or incomplete or not suitable for its purpose and for direct or indirect damages that may arise due to these reasons.
4.1.3 The owner of the application is responsible for the acts of third parties, force majeure, health care institutions and organizations, problems arising from the health personnel working in the said places, internet interruptions and connection problems, etc. is not responsible for any interruptions or disruptions that may occur in service procurement due to circumstances.
4.1.4 Membership to the application is free. The service provided by the application is free of charge. The application is for private and individual use. Users will be able to access the application with the username and password they created during registration to the application. The owner of the application is not responsible for the situations that may occur when the users give their username and password to a third party or lose this information.
4.1.5 The application owner will be able to use all the information of the users in the application in the field studies they will do and in the scientific articles they will write. The application owner reserves the right to share the information in question with the Grand Challenges Canada-Bold Ideas with Big Impact® fund, which provides financial support to the application. By reading this agreement and confirming that they have read it, users agree that all their information can be used by the application owner and the Grand Challenges Canada-Bold Ideas with Big Impact® fund; The user cannot claim any right to share information unless he/she quits using the application, deletes the user account, and leaves the work in which the HERA mobile application is included. This information sharing is not for advertising or commercial purposes. The user is entitled to the rights of the application owner, that the intellectual and industrial rights of the HERA application belong to MEDAK and that they will not reproduce, copy, distribute or process the pictures, texts, visual and audio images, files, databases, catalogs, information describing the treatment processes and any content in the application, in the application, accepts and undertakes that he will not act in violation of his assets. For this reason, the only addressee and responsible for the damages will be the user and the application owner will immediately indemnify the damages against such requests.

4.1.6 The user’s mobile device may require the user to be connected to the internet via wifi in order to access the App Store or Google Play Store applications so that the application can be downloaded and updated. The General Terms and Conditions of the App Store and Google Play Store will apply depending on the type of mobile device and use of the App Store or Google Play Store.
All rights of the application belong to HERA Inc. and the owner of the application reserves the right to change, add, remove, update the application content. Due to the updates to be made, technically insufficient devices may not be able to use the innovations in the application.
4.1.7 The user, in cases where HERA Inc. is obliged to make a statement to the official authorities in accordance with the provisions of the mandatory legislation in force, will be authorized to disclose the confidential/personal/health information of the members to the official authorities, if this information is duly requested by the official authorities. Agrees that they cannot claim compensation from Inc. under any name. Again, the user agrees that HERA Inc will process the personal data of users in accordance with the legislation and will inform its employees about it.
4.1.8 Users accept and undertake that the information that may be requested from them during the registration to the HERA mobile application and within the application is correct and in accordance with the law. HERA Inc, to verify the accuracy of information and content uploaded, modified and provided by users to HERA; It is not liable and responsible for undertaking and guaranteeing that this information and content is safe, accurate, in accordance with the provisions of this contract and the law, and it is not responsible for any damages that may arise due to the inaccuracy or inaccuracy of such information and content and/or referrals to other websites through these contents. cannot be held responsible. The user undertakes that the contact information provided in the relevant sections in the application is only his own contact information and only under his control, and that he actively uses this contact information. The owner of the application cannot be held responsible for any damages that may occur due to the fact that this contact information does not belong to the user or that he does not actively use the contact information.
4.1.9 HERA Inc. is not responsible for the content published by third parties, including the user, in the application and on the websites linked through the application. The commitment of the accuracy and legality of the information, content, visual and audio images provided and published by any third party is entirely the responsibility of the persons who perform these actions. HERA Inc. does not undertake or guarantee the security, accuracy and legality of the services and content provided by third parties.
4.1.10 User and HERA Inc. are independent parties. Approval and implementation of this contract does not result in a partnership, agency or employee-employer relationship between the parties.

4.2 User Rights and Obligations
4.2.1 The user has to fill in the requested information completely and truthfully and update it when necessary. The user is responsible for not filling in the information incompletely and/or truthfully.

4.2.2 The user accepts and declares that the application works with an internet connection, that some application contents, texts and images are displayed with an internet connection, that the internet usage fees will be covered by the user’s internet package or via wifi and he/she is informed about this.
4.2.3 The user accepts and declares that the information provided by the application is not for diagnostic and therapeutic purposes, only for advice and information, and that he knows that the use of the content is under his sole responsibility.
4.2.4 The user accepts that no content in the application replaces the information recommended by a doctor and that the use of the information in the application is at his own discretion and responsibility.
4.2.5 The user, through the application, HERA Inc. It accepts and declares that it knows that all kinds of information and data shared with HERA Inc. will be stored in a database for the period required by HERA Inc. or stipulated by the legislation. In this context, HERA Inc. may use the user information regarding the membership indefinitely for user security, fulfillment of its own obligations and some statistical evaluations. User, 4.1.5. accepts that this information can be used in the cases specified in the article, and that the information provided cannot be changed unless he/she requests it.
4.2.6 Users are responsible for the storage and security of the username and password they use to access their accounts. The application owner cannot be held responsible for giving this information to third parties, obtaining it by third parties and/or using this information and information obtained from user accounts, and any problems that may arise as a result of these situations.

5. Contract Changes
HERA Inc. may change this user agreement or any of its provisions, at any time it deems appropriate, by posting in the mobile application, depending on the current conditions and changes in the relevant legislation.

6. Termination of Membership
This agreement, which includes the above rules, which you will be deemed to have accepted as a user to HERA, is signed by HERA Inc. may be terminated unilaterally, with immediate effect, and the user’s use of the application may be terminated, at any time without any justification, without any notice and without any obligation to pay any compensation.

7. Applicable Law and Authority
7.1 The user declares, accepts and undertakes that he/she has read, understood and accepted all of the articles in this contract and that the information he/she has given about him/her is complete and correct.
7.2 Turkish Law will be applied in the implementation and interpretation of this contract and in the management of legal relations arising within this contract. Istanbul Anatolian Courts and Enforcement Offices are authorized in case of any dispute arising or may arise due to this contract.
7.3 This contract consists of 7 (seven) articles and has entered into force by mutual acceptance with the electronic consent of the user.`;

  const termsOfUseTr = `“HERA” Kullanıcı Sözleşmesi
1. Taraflar

1.1. Bu kullanıcı sözleşmesi, HERA Inc. 45 Prospect St Cambridge, MA 02139 United States (Uygulama Sahibi) ile HERA mobil uygulamasına kayıt olan kişi (Kullanıcı) arasında geçerlidir. Uygulamayı kullanan kullanıcının sözleşme kapsamında üyelik kaydını tamamlaması ve bu sözleşmeyi okuduğunu, anladığını ve kabul ettiğini elektronik ortamda onaylaması ile karşılıklı olarak akdedilmiş ve yürürlüğe girmiştir.

2. Sözleşmenin Konusu

2.1. Bu sözleşmenin konusu; tüm mülkiyet ve hakları HERA Inc.’e ait olan HERA mobil uygulamasında sunulan hizmetlerin belirlenmesi, bu hizmetlerden yararlanma koşulları ile tarafların karşılıklı hak ve yükümlülüklerinin düzenlenmesidir.

3. Tanımlar

3.1. Mobil uygulama: Söz konusu mobil uygulamanın adı “HERA (Health Recording Application)” olup, HERA adı verilen mobil uygulama; tüm mobil cihazlarda çalışan yazılımı ve bu yazılımla bağlantılı sunulan hizmetleri ifade eder. HERA, mülteci kadınlar ve 18 yaş altındaki çocukları için antenatal bakımın artırılması, aşılama takibinin sağlanması gibi amaçlarla geliştirilmiş bir mobil sağlık uygulamasıdır.

3.2. Üye/Kullanıcı: Bu sözleşmede belirtilen usul ve yöntemlerle mobil uygulamaya kayıt olan ve sözleşmede belirtilen koşullar dahilinde uygulamanın sunduğu hizmetlerden yararlanan kişilerin tümü.

3.3. Uygulamaya erişim araçları: Kullanıcının hesabını yönetmesini sağlayan kullanıcı adı, şifre gibi sadece kullanıcıya özel bilgilerdir.

3.4. Hizmetler: Kullanıcıların sözleşmenin 4. maddesinde belirtilen HERA uygulaması aracılığıyla yararlanacağı tüm işlemleri ifade eder.

3.5. İletişim kanalları: Uygulama ve anlık bildirim iletişim kanallarını ifade eder.

3.6. Kişisel bilgiler/gizli bilgiler: Kişinin adı, soyadı, adresi, telefon numarası, e-posta adresi, uygulama aracılığıyla verilen hizmetin sağlanması için kullanıcının kendi isteğiyle eklediği sağlık raporu fotoğrafları, uygulama içerisinde verilen sağlıkla ilgili sorulara verdiği yanıtlar ve kullanıcının kimliğini belirlemeye yarayan her türlü yazılı veya görsel işaret ve bilgiler.

4. Hak ve Yükümlülükler
4.1. Medikal Arama ve Kurtarma Derneği’nin Hak ve Yükümlülükleri

4.1.1. Medikal Arama ve Kurtarma Derneği, HERA üzerinden kullanıcının talebi doğrultusunda üstlendiği hizmetleri sunacaktır. Bu hizmetler; mülteci kadınların ve 18 yaş altındaki çocuklarının antenatal bakım ve aşı takip hizmetlerini geliştirmek ve izlemek için kontrol tarihlerinden önce anlık bildirimler göndermek, gebelik ve çocuk sağlığına dair sağlık bilgileri paylaşmak, bu konularda tavsiyelerde bulunmak, kullanıcıların elektronik sağlık kayıtlarını saklayabilecekleri ve istedikleri zaman kendi iradeleriyle görüntüleyebilecekleri bir platform sağlamaktır.

4.1.2. Uygulama sahibi tarafından sağlanan bilgi ve içerikler yalnızca tavsiye niteliğindedir; teşhis veya tedavi amacı taşımaz. Kullanıcı, uygulamanın ve paylaşılan tavsiyelerin kullanımından doğabilecek herhangi bir tıbbi, sosyal veya hukuki sorundan uygulama sahibini sorumlu tutamaz. Ayrıca uygulama sahibi; uygulamanın 7/24 kesintisiz sunulacağını garanti etmez ve bu konuda herhangi bir hizmet veya performans taahhüdünde bulunmaz. Uygulamanın etkin kullanımından ve doğabilecek tüm sonuçlardan kullanıcı sorumludur. HERA Inc., uygulamanın beklenen sonuçlarının eksik, yetersiz veya amaca uygun olmaması nedeniyle doğabilecek doğrudan veya dolaylı zararlardan hiçbir şekilde sorumlu değildir.

4.1.3. Uygulama sahibi; üçüncü kişilerin fiillerinden, mücbir sebeplerden, sağlık kurum ve kuruluşlarından, bu kurumlarda çalışan sağlık personelinden, internet kesintilerinden ve bağlantı sorunlarından kaynaklanabilecek hizmet kesintisi veya aksaklıklardan sorumlu değildir.

4.1.4. Uygulamaya üyelik ücretsizdir. Uygulamanın sunduğu hizmetler de ücretsizdir. Uygulama yalnızca kişisel ve bireysel kullanım içindir. Kullanıcılar, kayıt sırasında oluşturdukları kullanıcı adı ve şifre ile uygulamaya erişebileceklerdir. Kullanıcıların kullanıcı adı ve şifrelerini üçüncü kişilerle paylaşmaları veya bu bilgileri kaybetmeleri halinde doğabilecek durumlardan uygulama sahibi sorumlu değildir.

4.1.5. Uygulama sahibi, kullanıcıların uygulamadaki tüm bilgilerini yapacağı saha çalışmaları ve yazacağı bilimsel makalelerde kullanabilecektir. Uygulamanın finansal destekçisi olan Grand Challenges Canada-Bold Ideas with Big Impact® fonu ile bu bilgileri paylaşma hakkını saklı tutar. Kullanıcılar bu sözleşmeyi okuyup onaylayarak, tüm bilgilerinin uygulama sahibi ve ilgili fon tarafından kullanılabileceğini kabul etmiş sayılır. Kullanıcı, uygulamayı bırakmadıkça, hesabını silmedikçe ve HERA mobil uygulamasını içeren çalışmadan ayrılmadıkça, bilgi paylaşımına ilişkin herhangi bir hak iddia edemez. Bu bilgi paylaşımı reklam veya ticari amaçlı değildir. Kullanıcı ayrıca, uygulamanın tüm fikri ve sınai haklarının MEDAK’a ait olduğunu, uygulamada yer alan görselleri, metinleri, sesli veya görsel içerikleri, veritabanlarını, katalogları ve tedavi süreçlerini tanımlayan içerikleri çoğaltmayacağını, kopyalamayacağını, dağıtmayacağını, işlemeyeceğini kabul ve taahhüt eder. Aksi durumda doğacak zararların tek sorumlusu kullanıcıdır ve uygulama sahibini tazmin etmekle yükümlüdür.

4.1.6. Kullanıcının mobil cihazı, uygulamanın indirilebilmesi ve güncellenebilmesi için App Store veya Google Play Store’a wifi aracılığıyla bağlanmayı gerektirebilir. Cihaz türüne bağlı olarak App Store veya Google Play Store’un Genel Hüküm ve Koşulları geçerlidir.
Uygulamanın tüm hakları HERA Inc.’e aittir. Uygulama sahibi, uygulama içeriğini değiştirme, ekleme, kaldırma veya güncelleme hakkını saklı tutar. Yapılacak güncellemeler nedeniyle teknik açıdan yetersiz cihazlar uygulamanın yeniliklerinden yararlanamayabilir.

4.1.7. Kullanıcı, yürürlükteki zorunlu mevzuat hükümleri uyarınca HERA Inc.’in resmi makamlara açıklama yapmakla yükümlü olduğu durumlarda, gerekli görüldüğünde kişisel/gizli/sağlık bilgilerinin resmi makamlara açıklanabileceğini ve bu nedenle herhangi bir tazminat talep edemeyeceğini kabul eder. Ayrıca HERA Inc., kullanıcıların kişisel verilerini mevzuata uygun şekilde işleyebilir ve çalışanlarını bu konuda bilgilendirebilir.

4.1.8. Kullanıcılar, HERA mobil uygulamasına kayıt sırasında ve uygulama içerisinde kendilerinden talep edilen bilgilerin doğru ve yasalara uygun olduğunu kabul ve taahhüt eder. HERA Inc., kullanıcıların sağladığı bilgilerin doğruluğunu teyit etmek, bunların güvenli, doğru ve yasalara uygun olmasını garanti etmekle yükümlü değildir. Kullanıcı, uygulamada verdiği iletişim bilgilerinin yalnızca kendisine ait olduğunu ve aktif olarak kullandığını taahhüt eder.

4.1.9. HERA Inc., kullanıcı dahil üçüncü kişilerce uygulama içerisinde veya bağlantılı sitelerde yayınlanan içeriklerden sorumlu değildir. İçeriklerin doğruluğu ve hukuka uygunluğunun taahhüdü tamamen ilgili kişilerin sorumluluğundadır.

4.1.10. Kullanıcı ile HERA Inc. bağımsız taraflardır. Bu sözleşmenin onaylanması taraflar arasında ortaklık, acentelik veya işçi-işveren ilişkisi oluşturmaz.

4.2. Kullanıcının Hak ve Yükümlülükleri

4.2.1. Kullanıcı, talep edilen bilgileri eksiksiz ve doğru şekilde doldurmak ve gerektiğinde güncellemekle yükümlüdür.

4.2.2. Kullanıcı, uygulamanın internet bağlantısı ile çalıştığını, bazı içeriklerin internet bağlantısı olmadan görüntülenemeyeceğini, internet kullanım ücretlerinin kendi internet paketi veya wifi aracılığıyla karşılanacağını bildiğini kabul eder.

4.2.3. Kullanıcı, uygulama tarafından sağlanan bilgilerin teşhis ve tedavi amacı taşımadığını, yalnızca tavsiye ve bilgilendirme amacıyla olduğunu ve içerik kullanımının tamamen kendi sorumluluğunda olduğunu kabul eder.

4.2.4. Kullanıcı, uygulamadaki hiçbir içeriğin doktor tavsiyesinin yerine geçmediğini, içerik kullanımının kendi iradesi ve sorumluluğunda olduğunu kabul eder.

4.2.5. Kullanıcı, uygulama aracılığıyla HERA Inc. ile paylaştığı her türlü bilgi ve verinin, HERA Inc. tarafından veya mevzuatta öngörülen süre boyunca veritabanında saklanacağını kabul eder. Kullanıcı, bu bilgilerin sözleşmenin 4.1.5. maddesinde belirtilen durumlarda kullanılabileceğini kabul eder.

4.2.6. Kullanıcı, hesaplarına erişmek için kullandığı kullanıcı adı ve şifrenin saklanması ve güvenliğinden sorumludur.

5. Sözleşme Değişiklikleri

HERA Inc., bu kullanıcı sözleşmesini veya herhangi bir maddesini gerekli gördüğü zaman mobil uygulamada yayımlamak suretiyle değiştirebilir.

6. Üyeliğin Sona Ermesi

Kullanıcı tarafından kabul edilmiş sayılan bu sözleşme, HERA Inc. tarafından herhangi bir gerekçe göstermeksizin, herhangi bir bildirim yapılmaksızın ve herhangi bir tazminat yükümlülüğü olmaksızın tek taraflı olarak feshedilebilir.

7. Uygulanacak Hukuk ve Yetki

7.1. Kullanıcı, bu sözleşmenin tüm maddelerini okuduğunu, anladığını ve kabul ettiğini; kendisine ait verdiği bilgilerin tam ve doğru olduğunu beyan ve taahhüt eder.

7.2. Bu sözleşmenin uygulanması ve yorumlanmasında Türk Hukuku geçerli olacaktır. İşbu sözleşmeden doğabilecek uyuşmazlıklarda İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.

7.3. Bu sözleşme 7 (yedi) maddeden oluşmakta olup, kullanıcının elektronik onayıyla karşılıklı kabul sonucu yürürlüğe girmiştir.`;

  const termsOfUseAr = `اتفاقية مستخدم "HERA"
1. الأطراف

1.1 تسري هذه الاتفاقية على شركة هيرا (Hera Inc.) الكائنة في 45 Prospect St Cambridge, MA 02139 الولايات المتحدة (مالك التطبيق) وعلى الشخص (المستخدم) الذي قام بالتسجيل في تطبيق الهاتف المحمول HERA، وقد تم إبرامها ودخولها حيز التنفيذ بشكل متبادل عند قيام المستخدم الذي يستعمل التطبيق بإكمال تسجيل العضوية ضمن نطاق العقد والموافقة في البيئة الإلكترونية على أنه قد قرأ هذه الاتفاقية وفهمها وقَبِلَها.

2. موضوع العقد

2.1 موضوع هذه الاتفاقية هو تحديد الخدمات المقدمة في تطبيق الهاتف المحمول HERA، والذي تعود ملكيته وجميع حقوقه إلى شركة HERA Inc.، وشروط الاستفادة من هذه الخدمات، والحقوق والالتزامات المتبادلة بين الطرفين.

3. التعريفات

3.1 التطبيق المحمول: اسم التطبيق المعني هو HERA (Health Recording Application) ويشير إلى برمجية التطبيق التي تعمل على جميع الأجهزة المحمولة والخدمات المرتبطة بها. يهدف HERA إلى تحسين خدمات الرعاية السابقة للولادة وزيادة نسب التطعيم والمتابعة للنساء اللاجئات وأطفالهن دون سن 18 عاماً.

3.2 العضو/المستخدم: يشير إلى جميع الأشخاص الذين يسجلون في التطبيق وفق الطرق المحددة في هذه الاتفاقية ويستفيدون من الخدمات ضمن الشروط المذكورة فيها.

3.3 أدوات الوصول إلى التطبيق: معلومات تخص المستخدم وحده مثل صفحة إدارة الحساب، واسم المستخدم وكلمة المرور التي تتيح له الوصول إلى التطبيق.

3.4 الخدمات: جميع المعاملات والخدمات التي يستفيد منها المستخدمون بفضل تطبيق HERA كما هو موضح في المادة 4 من العقد.

3.5 قنوات الاتصال: يقصد بها التطبيق وقناة الإشعارات الفورية.

3.6 المعلومات الشخصية/السرية: مثل الاسم واللقب والعنوان ورقم الهاتف والبريد الإلكتروني، وإجابات الأسئلة المتعلقة بصحة المستخدم، وصور التقارير الصحية التي يمكن أن يضيفها المستخدم بإرادته، وأي بيانات مكتوبة أو مرئية تحدد هوية المستخدم.

4. الحقوق والالتزامات
4.1 حقوق والتزامات جمعية البحث والإنقاذ الطبي

4.1.1 تتعهد الجمعية بتقديم الخدمات عبر تطبيق HERA مثل تحسين ومتابعة خدمات الرعاية السابقة للولادة والتطعيم، إرسال الإشعارات الفورية، مشاركة المعلومات الصحية حول الحمل والطفولة، تقديم النصائح، وتمكين المستخدمين من حفظ سجلاتهم الصحية الإلكترونية وعرضها متى شاؤوا.

4.1.2 المعلومات المقدمة في التطبيق ذات طبيعة استشارية فقط وليست للتشخيص أو العلاج. ولا يتحمل مالك التطبيق أي مسؤولية عن النتائج الطبية أو الاجتماعية أو القانونية الناشئة عن استخدامه. كما لا يضمن استمرارية الخدمة دون انقطاع.

4.1.3 لا يكون مالك التطبيق مسؤولاً عن انقطاع الخدمات بسبب أطراف ثالثة أو قوة قاهرة أو مشاكل في المؤسسات الصحية أو مزودي الخدمة أو الإنترنت.

4.1.4 التسجيل مجاني وكذلك الخدمات. التطبيق مخصص للاستعمال الشخصي فقط. المستخدم مسؤول عن اسم المستخدم وكلمة المرور الخاصة به.

4.1.5 يمكن لمالك التطبيق استخدام معلومات المستخدمين في الدراسات الميدانية والأبحاث العلمية، وله الحق في مشاركتها مع صندوق Grand Challenges Canada - Bold Ideas with Big Impact® الممول للتطبيق. ويقر المستخدم بأن حقوق الملكية الفكرية والصناعية لتطبيق HERA تعود إلى MEDAK، وأنه لن يقوم بأي نسخ أو توزيع أو تعديل لمحتوياته.

4.1.6 قد يتطلب تحميل أو تحديث التطبيق الاتصال بالإنترنت عبر App Store أو Google Play، وتسري شروط هذه المتاجر. ويحتفظ مالك التطبيق بحق التحديث أو التغيير.

4.1.7 يوافق المستخدم على أن HERA Inc. قد تضطر للإفصاح عن المعلومات الشخصية/الصحية للجهات الرسمية إذا طُلب ذلك بموجب القانون.

4.1.8 يلتزم المستخدم بتقديم معلومات صحيحة ودقيقة. ولا تتحمل الشركة أي التزام بضمان دقة وصحة البيانات التي يقدمها المستخدم أو الأضرار الناتجة عنها.

4.1.9 لا تتحمل HERA Inc. مسؤولية أي محتوى يقدمه طرف ثالث.

4.1.10 يظل المستخدم و HERA Inc. طرفين مستقلين، ولا تنشأ أي علاقة شراكة أو وكالة أو عمل بينهما.

4.2 حقوق والتزامات المستخدم

4.2.1 على المستخدم إدخال بياناته بشكل كامل وصحيح وتحديثها عند الحاجة.

4.2.2 يقر المستخدم بأن التطبيق يعمل باتصال إنترنت، وأن تكاليف الإنترنت تقع على عاتقه.

4.2.3 يقر المستخدم بأن المعلومات المقدمة هي للاستشارة فقط وليست للتشخيص والعلاج.

4.2.4 يقر المستخدم بأن محتوى التطبيق لا يغني عن استشارة الطبيب.

4.2.5 يقبل المستخدم بأن المعلومات المقدمة عبر التطبيق ستخزن في قاعدة بيانات لفترة تحددها HERA Inc. أو ينص عليها القانون.

4.2.6 المستخدم مسؤول عن تخزين وحماية بيانات دخوله.

5. تعديلات العقد

يجوز لشركة HERA Inc. تعديل هذه الاتفاقية في أي وقت بنشرها في التطبيق.

6. إنهاء العضوية

يجوز لشركة HERA Inc. إنهاء هذه الاتفاقية وإنهاء استخدام المستخدم للتطبيق فوراً ودون إخطار أو مبرر ودون أي تعويض.

7. القانون الواجب التطبيق والاختصاص

7.1 يقر المستخدم بأنه قرأ وفهم وقَبِل جميع مواد هذه الاتفاقية.

7.2 يخضع تنفيذ وتفسير هذه الاتفاقية للقانون التركي، وتكون محاكم التنفيذ في إسطنبول الأناضول هي المختصة في حال نشوء أي نزاع.

7.3 تتكون هذه الاتفاقية من سبع مواد، وقد دخلت حيز التنفيذ بقبول المستخدم إلكترونياً.`;

  const termOfUse = locale === 'ar' ? termsOfUseAr : locale === 'tr' ? termsOfUseTr : termsOfUseEn;

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={GlobalStyles.HeadingText}>{t('terms_of_use_toolbar_title')}</Text>
        <ScrollView>
          <Text style={[GlobalStyles.NormalText, {textAlign: 'justify'}]}>{termOfUse}</Text>
          <CheckBox label={t('complete_profile_screen_terms_of_use_description')} initIsChecked={false} onChange={(v)=>{setIsAccept(v)}}/>
          <View style={{width: '100%', height: 80}} />
        </ScrollView>
        <Button 
          style={styles.continueButton}
          buttonType={isAccept ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
          label={t('continue_word')}
          onPress={isAccept ? () => {router.push('/registration/privacy-policy')} : () => {}}
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
    // marginTop: Spacing.xxlarge,
    backgroundColor: '#fff',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
  }
});