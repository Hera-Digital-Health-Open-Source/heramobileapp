import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function TermsOfUse(){
  const router = useRouter();
  const [isAccept, setIsAccept] = useState(false);

  const termOfUse = `“HERA” User Agreement

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

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={GlobalStyles.HeadingText}>Term of Use</Text>
        <ScrollView>
          <Text style={[GlobalStyles.NormalText, {textAlign: 'justify'}]}>{termOfUse}</Text>
          <CheckBox label="I have read and accept the Terms of Use" initIsChecked={false} onChange={(v)=>{setIsAccept(v)}}/>
          <View style={{width: '100%', height: 80}} />
        </ScrollView>
        <Button 
          style={styles.continueButton}
          buttonType={isAccept ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
          label="Continue"
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