package example;
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.xml.ws.Endpoint;

@WebService()
public class DistanceService {
    @WebMethod
    public double calculDistance(double lat1,
                                 double lon1, double lat2,
                                 double lon2)
    {
        lon1 = Math.toRadians(lon1);
        lon2 = Math.toRadians(lon2);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);

        double dlon = lon2 - lon1;
        double dlat = lat2 - lat1;
        double a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2),2);

        double c = 2 * Math.asin(Math.sqrt(a));

        double r = 6371;

        return Math.floor((c * r) * 100) / 100;
    }

    public static void main(String[] argv) {
        Object implementor = new DistanceService();
        String address = "http://localhost:9000/DistanceService";
        Endpoint.publish(address, implementor);
    }
}
