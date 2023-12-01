import AlprData from '@/components/alpr-data'
import AlprImages from '@/components/alpr-images'
import AlprVideo from '@/components/alprI-video'
import DataTable from '@/components/data-table'
import Layout from '@/components/layout'

export default function AlprHome() {
    return (
        <Layout>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <AlprData />
                <AlprImages />
                <AlprVideo />
            </div>
            <div className="border border-indigo-600"
                style={{
                    height: 300,
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                }}
            >
            </div>
        </Layout>
    )
}



