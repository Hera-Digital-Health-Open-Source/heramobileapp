import React, { useEffect, ReactNode } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, useWindowDimensions, StyleProp, ViewStyle, RefreshControl } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { color, GlobalStyles, Spacing } from '@/assets/theme';
import { useState } from 'react';
import Button, { ButtonStyles } from '@/components/Button';
import { useHttpClient } from '@/context/HttpClientContext';
import { useAuth } from '@/context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import {PregnancyAppointmentView, VaccineAppointmentView, NoAppointmentView} from '@/components/appointments-screen/AppointmentView';
import Appointment from '@/models/IAppointment';
import MarkAsDoneModal from '@/components/appointments-screen/MarkAsDoneModal';
import Vaccine from '@/models/Vaccine';
import Child from '@/models/Child';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { I18nManager } from 'react-native';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

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
  const { session } = useAuth();
  const [ selectedAppointments, setSelectedAppointments ] = useState<Appointment[]>([]);
  const [ selectedDay, setSelectedDay ] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const router = useRouter();
  const {t} = useTranslation();

  const getVaccines = async () => {
    setRefreshing(true);
    let result = await sendRequestFetch<Vaccine[]>({
      url: '/vaccines/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    });

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
        Authorization: 'Token ' + session,
      },
    });

    const s = result.data!;
    setChildren(s);

    // console.log('children:')
    // console.log(s);

    setRefreshing(false);
  };

  const getAppointments = async () => {
    // console.log('Preparing to call sendRequest... ')
    setRefreshing(true);
    let result = await sendRequestFetch<Appointment[]>({
      url: '/calendar_events/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    });

    if(result.isTokenExpired){
      setRefreshing(false);
      throw new Error('Token expired');
    }
    const s = result.data!;
    setAppointments(s);

    setRefreshing(false);
    return;
    result = await sendRequestFetch<[]>({
      url: '/children/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    });


    setRefreshing(false);
    // const filtered = s.filter(e => e.event_type === 'vaccination');
    // const u = filtered.map(e => e.dose_ids)
    //console.log(result.data)

  };

  const handleOnSave = async (childId: number, takenVaccineNames: string[]) => {
    const takenVaccineIds = takenVaccineNames.map(v => getVaccineId(vaccines, v)!);
    const child = children.filter(c => c.id === childId)[0];
    child.past_vaccinations = takenVaccineIds;

    await sendRequestFetch<{}>({
      url: `/children/${childId}/`,
      method: 'PATCH',
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + session,
      },
      data: child,
    });
  };

  useEffect(() => {
    getAppointments()
    .then(() => {
      getVaccines().then(() => {
        getChildren();
      });
    })
    .catch((e) => {
      console.log(e);
      router.replace('/auth/login');
    });
  }, []);

  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    const isVaccination = item.event_type == 'vaccination';
    let takenVaccineNames: string[] = [];
  
    if(isVaccination){
      // console.log('in renderAppointmentItem')
      // console.log(children);
      const takenVaccineIds = children.filter(c => c.id === item.child_id)[0].past_vaccinations;
      takenVaccineNames = takenVaccineIds.map(i => getVaccineName(vaccines, i)!);
    }

    return (
      <View style={[styles.item, {flexDirection: 'row', gap: Spacing.large, alignItems: 'center'}]}>
        <View style={{flex: 4, gap: Spacing.medium}}>
          <Text style={GlobalStyles.SubHeadingText}>{item.date}</Text>
          <Text style={styles.title}>{isVaccination ? item.person_name : t('my_appointments_pregnancy_check')}</Text>
          <Text style={{}}>{isVaccination ? item.vaccine_names : ''}</Text>
        </View>
        <MarkAsDoneModal
          appointment={item}
          onSave={async (takenVaccineNames) => {await handleOnSave(item.child_id, takenVaccineNames)}}
          initTakenVaccines={takenVaccineNames} 
        />
      </View>
  )};

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const markedDates = appointments.reduce((acc: { [key: string]: { marked: boolean; dotColor: string, customStyles?: object } }, appointment) => {
    acc[appointment.date] = { 
      marked: true,
      dotColor: color.primary,
      customStyles: {
        text: {
          color: color.primary,
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
        backgroundColor: color.primary,
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
        borderColor: color.primary,
        borderWidth: 1,
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
      },
      text: {
        color: color.primary,
        fontWeight: 'bold',
      },
    },
  };

  const currentMonth = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
      <Text style={[GlobalStyles.SubHeadingText, {textAlign: 'center'}]}>{t('home_screen_my_appointments_title')}</Text>
      <View style={{ flexDirection: 'row', gap: 10, width: '75%', marginLeft: Spacing.medium }}>
        <Button style={{flex: 3}} buttonType={isCalendarView ? ButtonStyles.FILLED : ButtonStyles.UNFILLED} label={t('my_appointments_screen_calender_view')} onPress={() => setIsCalendarView(true)} />
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
              onDayPress={(day: DateObject) => {
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
          renderItem={renderAppointmentItem}
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
    marginTop: Spacing.xxlarge,
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

