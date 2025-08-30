import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/assets/theme';
import { useHttpClient } from '@/context/HttpClientContext';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { useProfileStore } from '@/store/profileStore';

interface IArticleDetails {
  id: number;
  title: string;
  content: string;
}

export default function ArticleDetailsScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const [article, setArticle] = useState<IArticleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { sendRequestFetch } = useHttpClient();
  const { session } = useAuthStore();
  const { userProfile } = useProfileStore();
  const router = useRouter();

  useEffect(() => {
    async function getArticleDetails() {
      if (!id) return;
      
      try {
        setLoading(true);
        const result = await sendRequestFetch<IArticleDetails>({
          url: `/articles/${id}/${userProfile?.language_code}/`,
          method: 'GET',
          headers: {
            'Accept-Language': 'en',
            Authorization: 'Token ' + session,
          },
        });

        if(result.isTokenExpired){
          return router.replace('/auth/login');
        }

        if (result.data) {
          setArticle(result.data);
          setError(null);
        } else {
          setError('Failed to load article');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    }

    getArticleDetails();
  }, [id, userProfile?.language_code, session]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading article...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{article?.title || title}</Text>
        {article?.content && (
          <Text style={styles.content}>{article.content}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
    textAlign: 'left',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black,
    textAlign: 'left',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.primary,
    fontSize: 16,
  },
  errorText: {
    color: Colors.red,
    fontSize: 16,
    textAlign: 'center',
  },
});
