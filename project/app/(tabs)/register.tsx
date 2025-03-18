import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      setError('Lütfen tüm alanları doldurun ve şifrelerin eşleştiğinden emin olun');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await signUp(formData.email, formData.password);
      
      if (signUpError) {
        setError('Kayıt oluşturulamadı. Lütfen farklı bir e-posta adresi deneyin.');
      } else {
        router.replace('/');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={{ uri: 'https://i.imgur.com/XqQR3Iv.png' }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.logoText}>Mama İstasyonu</Text>
            <Text style={styles.subtitle}>Sokak Dostlarımız İçin</Text>
          </View>

          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>AD SOYAD</Text>
              <TextInput
                style={styles.input}
                placeholder="Adınızı ve soyadınızı giriniz"
                value={formData.fullName}
                onChangeText={(text) => {
                  setFormData({ ...formData, fullName: text });
                  setError(null);
                }}
                editable={!loading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>E-POSTA</Text>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  setError(null);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>TELEFON</Text>
              <TextInput
                style={styles.input}
                placeholder="Telefon numaranızı giriniz"
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                  setError(null);
                }}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>ŞİFRE</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifrenizi giriniz"
                  value={formData.password}
                  onChangeText={(text) => {
                    setFormData({ ...formData, password: text });
                    setError(null);
                  }}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#666" />
                  ) : (
                    <Eye size={20} color="#666" />
                  )}
                </Pressable>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>ŞİFRE TEKRAR</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifrenizi tekrar giriniz"
                  value={formData.confirmPassword}
                  onChangeText={(text) => {
                    setFormData({ ...formData, confirmPassword: text });
                    setError(null);
                  }}
                  secureTextEntry={!showConfirmPassword}
                  editable={!loading}
                />
                <Pressable 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#666" />
                  ) : (
                    <Eye size={20} color="#666" />
                  )}
                </Pressable>
              </View>
            </View>

            <Text style={styles.terms}>
              Kişisel Verilerin Korunması ve İşlenmesine İlişkin Aydınlatma Metni'ni okudum, anladım. KVKK gereği kişisel verilerin korunması amacıyla KVKK'ya uygun bir şekilde işlenmesine ve saklanmasına rıza gösteriyorum.
            </Text>

            <TouchableOpacity 
              style={[
                styles.registerButton, 
                isFormValid() ? styles.registerButtonActive : null,
                loading && styles.registerButtonLoading
              ]}
              onPress={handleRegister}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.registerButtonText}>ÜYE OL</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>veya</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/login" asChild>
              <TouchableOpacity 
                style={styles.loginButton}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 15,
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e65c00',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    gap: 16,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  terms: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginTop: 8,
  },
  registerButton: {
    backgroundColor: '#ccc',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonActive: {
    backgroundColor: '#e65c00',
  },
  registerButtonLoading: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e65c00',
  },
  loginButtonText: {
    color: '#e65c00',
    fontSize: 16,
    fontWeight: '700',
  },
});