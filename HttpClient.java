import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class HttpClient {
 
	public static void main(String[] args) {
		try {
			URL url = new URL("http://simpleinterest.mybluemix.net/simpleinterest?p=1000&r=0.05&t=10");
			BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
			String strTemp = "";
			while (null != (strTemp = br.readLine())) {
				System.out.println(strTemp);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
