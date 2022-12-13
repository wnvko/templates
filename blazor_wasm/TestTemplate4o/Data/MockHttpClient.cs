using System.Net;
using Moq;
using Moq.Protected;

namespace TestTemplate4o {

    public class MockHttpClient
    {
        public HttpClient Create()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            mockHttpMessageHandler
                .Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(() => new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("[]")
                });

            var mockHttpClient = new HttpClient(mockHttpMessageHandler.Object);
            mockHttpClient.BaseAddress = new Uri("https://test.com/");

            return mockHttpClient;
        }
    }
}
