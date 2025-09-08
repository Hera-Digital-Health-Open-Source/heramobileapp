import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, useWindowDimensions, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors, GlobalStyles, Spacing } from '@/assets/theme';
import { useState } from 'react';
import Button, { ButtonStyles } from '@/components/Button';
import { useHttpClient } from '@/context/HttpClientContext';
import { useAuthStore } from '@/store/authStore';
import { ScrollView } from 'react-native-gesture-handler';
import {PregnancyAppointmentView, VaccineAppointmentView, NoAppointmentView} from '@/components/appointments-screen/AppointmentView';
import Appointment from '@/interfaces/IAppointment';
import ConfirmTakenPastVaccinesModal from '@/components/appointments-screen/ConfirmTakenPastVaccinesModal';
import ConfirmTakenPregnancyModel from '@/components/appointments-screen/ConfirmTakenPregnancyModal';
import Vaccine from '@/interfaces/IVaccine';
import Child from '@/interfaces/IChild';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import DynamicNavigationHeader from '@/components/DynamicNavigationHeader';
import ISurvey from '@/interfaces/ISurvey';
import IDateObject from '@/interfaces/IDateObject';

function getVaccineId(vaccines: Vaccine[], vaccineName: string) {
  if (vaccines) {
    const [filtered] = vaccines.filter(e => e.name === vaccineName);
    return filtered.id;
  }
}

function getVaccineName(vaccines: Vaccine[], vaccine_id: number) {
  if (vaccines) {
    const [filtered] = vaccines.filter(e => e.id === vaccine_id);
    return filtered.name;
  }
}

export default function Appointments() {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const { sendRequestFetch } = useHttpClient();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { session, idToken } = useAuthStore();
  const [ selectedAppointments, setSelectedAppointments ] = useState<Appointment[]>([]);
  const [ selectedDay, setSelectedDay ] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [pregnancySruveys, setPregnancySurvyes] = useState<ISurvey[]>();
  const router = useRouter();
  const { t, locale } = useTranslation();

  const getPregnancySurveys = async () => {
    setRefreshing(true);
    let result = await sendRequestFetch<ISurvey[]>({
      url: '/surveys/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    const data = result.data!;
    setPregnancySurvyes(data.filter(i => i.context.event_type == 'prenatal_checkup'));

    setRefreshing(false);
  };

  const getVaccines = async () => {
    setRefreshing(true);
    let result = await sendRequestFetch<Vaccine[]>({
      url: '/vaccines/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    const s = result.data!;
    setVaccines(s);

    setRefreshing(false);
  };

  const getChildren = async () => {
    setRefreshing(true);
    let result = await sendRequestFetch<Child[]>({
      url: '/children/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    const s = result.data!;
    setChildren(s);
    setRefreshing(false);
  };

  const getAppointments = async () => {
    setRefreshing(true);
    let result = await sendRequestFetch<Appointment[]>({
      url: '/calendar_events/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    // if(result.isTokenExpired){
    //   setRefreshing(false);
    //   throw new Error('Token expired');
    // }
    const s = result.data!;
    setAppointments(s);

    setRefreshing(false);
    return;
    result = await sendRequestFetch<[]>({
      url: '/children/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Bearer ' + session,
      },
    });


    setRefreshing(false);
  };

  const saveTakenVaccines = async (childId: number, takenVaccineNames: string[]) => {
    const takenVaccineIds = takenVaccineNames.map(v => getVaccineId(vaccines, v)!);
    const child = children.filter(c => c.id === childId)[0];
    child.past_vaccinations = takenVaccineIds;

    const response = await sendRequestFetch<{}>({
      url: `/children/${childId}/`,
      method: 'PATCH',
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
      data: child,
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }
  };

  const updatePregnancySurvey = async (survey_id: number) => {
    const response = await sendRequestFetch<{}>({
      url: `/surveys/${survey_id}/response/`,
      method: 'POST',
      data: {
        response: 'pregnancyyes',
      },
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session,
        'Id-Authorization': 'Bearer ' + idToken!
      },
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if(response.error){
      console.log('Error when updating pregnancy survey: ', response.error);
      return;
    }
  };

  useEffect(() => {
    getAppointments()
    .then(() => {
      getVaccines().then(() => {
        getChildren();
        getPregnancySurveys();
      });
    })
    .catch((e) => {
      console.log(e);
      router.replace('/auth/login');
    });
  }, []);

  const renderAppointmentVaccineListItem = (item : Appointment) => {
    const takenVaccineIds = children.filter(c => c.id === item.child_id)[0].past_vaccinations;
    const takenVaccineNames = takenVaccineIds.map(i => getVaccineName(vaccines, i)!);
    const formatVaccineNames = (vaccine_names: string[]) => {
      if(vaccine_names.length === 0) return "";
      if(vaccine_names.length === 1){
        return vaccine_names[0];
      } else if(vaccine_names.length === 2){
        return `${vaccine_names[0]} ${t('and_word')} ${vaccine_names[1]}`
      } else {
        return `${vaccine_names.slice(0, -1).join(', ')} ${t('and_word')} ${vaccine_names[vaccine_names.length - 1]}`;
      }
    };

    return (
      <View style={[styles.item, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{flex: 5, gap: Spacing.medium, alignItems: 'flex-start'}}>
          <Text style={ GlobalStyles.SubHeadingText }>{item.date}</Text>
          <Text style={styles.title}>{ item.person_name }</Text>
          <Text style={{}}>{ formatVaccineNames(item.vaccine_names) }</Text>
        </View>
        <View style={{alignItems: 'center', flex: 3}}>
          <ConfirmTakenPastVaccinesModal
            appointment={item}
            onSave={async (takenVaccineNames) => {await saveTakenVaccines(item.child_id, takenVaccineNames)}}
            initTakenVaccines={takenVaccineNames} 
          />
        </View>
      </View>
    )
  };

  const renderAppointmentPregnancyListItem = (item : Appointment) => {
    return (
      <View style={[styles.item, {flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{flex: 5, gap: Spacing.medium, alignItems:'flex-start'}}>
          <Text style={GlobalStyles.SubHeadingText}>{item.date}</Text>
          <Text style={styles.title}>{t('my_appointments_pregnancy_check')}</Text>
          <Text style={{}}>{''}</Text>
        </View>
        <View style={{alignItems: 'center', flex: 3}}>
          <ConfirmTakenPregnancyModel
            appointment={item}
            onConfirm={async () => {updatePregnancySurvey(pregnancySruveys!.find(ps => ps.context.date === item.date)?.id!)}}
            isTaken={
              !!pregnancySruveys!.find(ps => ps.response == 'pregnancyyes' && ps.context.date === item.date)
            }
            isAvailable={!!pregnancySruveys!.find(ps => ps.context.date === item.date)}
          />
        </View>
      </View>
    )
  };

  const renderAppointmentListItem = ({ item }: { item: Appointment }) => {
    if(item.event_type === 'vaccination'){
      return renderAppointmentVaccineListItem(item);
    } else {
      return renderAppointmentPregnancyListItem(item);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  let markedDates;

  if(!appointments || appointments.length === 0){
    markedDates = undefined;
  } else {
    markedDates = appointments.reduce((acc: { [key: string]: { marked: boolean; dotColor: string, customStyles?: object } }, appointment) => {
        acc[appointment.date] = { 
        marked: true,
        dotColor: Colors.primary,
        customStyles: {
            text: {
            color: Colors.primary,
            fontWeight: 'bold',
            },
        }
        };
        return acc;
    }, {});
    
    // Add custom style for the current date
    markedDates[currentDate] = {
        marked: false,
        dotColor: '',
        customStyles: {
        container: {
            backgroundColor: Colors.primary,
            width: 34, // Adjust the width to make it a circle
            height: 34, // Adjust the height to make it a circle
            borderRadius: 17, // Half of the width/height to make it a circle
            justifyContent: 'center', // Center the text vertically
            alignItems: 'center', // Center the text horizontally
        },
        text: {
            color: 'white',
        },
        },
    };
    
    // Add custom style for the selected day
    markedDates[selectedDay] = {
        marked: false,
        dotColor: '',
        customStyles: {
        container: {
            width: 34, // Adjust the width to make it a circle
            height: 34, // Adjust the height to make it a circle
            borderRadius: 17, // Half of the width/height to make it a circle
            borderColor: Colors.primary,
            borderWidth: 1,
            justifyContent: 'center', // Center the text vertically
            alignItems: 'center', // Center the text horizontally
        },
        text: {
            color: Colors.primary,
            fontWeight: 'bold',
        },
        },
    };
  }

  const currentMonth = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <DynamicNavigationHeader /> */}
      <View style={styles.container}>
      <Text style={[GlobalStyles.SubHeadingText, {textAlign: 'center'}]}>{t('home_screen_my_appointments_title')}</Text>
      <View style={{ flexDirection: 'row', gap: 10, width: '75%', marginLeft: Spacing.medium }}>
        <Button style={{flex: 2}} buttonType={isCalendarView ? ButtonStyles.FILLED : ButtonStyles.UNFILLED} label={t('my_appointments_screen_calender_view')} onPress={() => setIsCalendarView(true)} />
        <Button style={{flex: 2}}  buttonType={isCalendarView ? ButtonStyles.UNFILLED : ButtonStyles.FILLED} label={t('my_appointments_screen_list_view')} onPress={() => setIsCalendarView(false)} />
      </View>
      {isCalendarView && (
        <View style={{flex: 1}}>
          <ScrollView
            style={{}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getAppointments()}
              />
            }
          >
             <Calendar
              markedDates={markedDates}
              onDayPress={(day: IDateObject) => {
                setSelectedAppointments(appointments.filter(a => a.date === day.dateString));
                setSelectedDay(day.dateString);
              }}
              current={currentMonth}
              markingType={'custom'}
              // onMonthChange={(month) => {
              //   setCurrentMonth(month.dateString);
              // }}
              // Enable these props for better navigation experience
              enableSwipeMonths={true}
              // The Calendar component handles RTL properly
            />
            <View style={{marginHorizontal: Spacing.medium}}>
              {selectedAppointments.length > 0 
                ? (
                  selectedAppointments.map((a, index) => (
                    a.event_type === 'vaccination'
                    ? (<VaccineAppointmentView style={{marginBottom: Spacing.medium}} key={index} person_name={a.person_name} vaccine_names={a.vaccine_names} />)
                    : (<PregnancyAppointmentView style={{}} key={index} />) 
                  ))
                )
                : (
                  <NoAppointmentView style={{marginTop: Spacing.xxlarge}}/>
                )
              }
            </View>
          </ScrollView>
        </View>
      )}
      {!isCalendarView && (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentListItem}
          keyExtractor={(item) => `${item.event_type === 'vaccination' ? '' : `${item.date}_`}${item.event_key}`}
        />
      )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   backgroundColor: '#fff',
  // },
  container: {
    flex: 1,
    marginTop: 0,
    gap: Spacing.medium,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 18,
    color: '#888',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

