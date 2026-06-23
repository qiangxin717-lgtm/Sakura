import { useState, useEffect } from 'react';
import { Shield, Trash2, Users, FileText, Loader2 } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { useAuth } from '@/hooks/use-auth';
import * as api from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CommunityShare, UserProfile } from '@/types';

export function AdminSection() {
  const { t, lang } = useI18n();
  const { profile } = useAuth();
  const [tab, setTab] = useState<'shares' | 'users'>('shares');
  const [shares, setShares] = useState<CommunityShare[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    if (tab === 'shares') {
      const data = await api.fetchAllShares();
      setShares(data);
    } else {
      const data = await api.fetchAllUsers();
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [tab]);

  const handleDeleteShare = async (id: string) => {
    if (!confirm(t.admin.deleteConfirm)) return;
    const { error } = await api.deleteShare(id);
    if (!error) {
      setShares((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleToggleRole = async (userId: string, currentRole: 'user' | 'admin') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await api.updateUserRole(userId, newRole);
    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl bg-amber-500/10 p-6 text-center text-amber-700">
          {lang === 'zh'
            ? 'Supabase 未配置，管理后台不可用'
            : 'Supabase not configured, admin unavailable'}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      {/* 标题 */}
      <div className="mb-6 flex items-center gap-3 animate-fade-in-up">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">
            {t.admin.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile?.display_name} · {t.admin.adminRole}
          </p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as 'shares' | 'users')}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="shares" className="cursor-pointer">
            <FileText className="mr-1.5 h-4 w-4" />
            {t.admin.shares}
          </TabsTrigger>
          <TabsTrigger value="users" className="cursor-pointer">
            <Users className="mr-1.5 h-4 w-4" />
            {t.admin.users}
          </TabsTrigger>
        </TabsList>

        {/* 分享管理 */}
        <TabsContent value="shares" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : shares.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t.admin.noData}</p>
          ) : (
            <div className="rounded-2xl bg-card shadow-clay overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.community.author}</TableHead>
                    <TableHead>{t.community.phrase}</TableHead>
                    <TableHead>{t.community.scenario}</TableHead>
                    <TableHead className="text-right">{t.common.delete}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shares.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserAvatar name={s.author || '匿名'} avatar={s.avatar} size="sm" />
                          <span className="text-sm">{s.author || t.community.anonymous}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate text-sm">{s.phrase[lang]}</p>
                      </TableCell>
                      <TableCell>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                          {s.scenario[lang]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteShare(s.id)}
                          className="cursor-pointer text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* 用户管理 */}
        <TabsContent value="users" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : users.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t.admin.noData}</p>
          ) : (
            <div className="rounded-2xl bg-card shadow-clay overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.community.author}</TableHead>
                    <TableHead>{t.admin.role}</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserAvatar name={u.display_name} avatar={u.avatar} size="sm" />
                          <span className="text-sm">{u.display_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            u.role === 'admin'
                              ? 'rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'
                              : 'rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground'
                          }
                        >
                          {u.role === 'admin' ? t.admin.adminRole : t.admin.user}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleRole(u.id, u.role)}
                          className="cursor-pointer"
                          disabled={u.id === profile?.id}
                        >
                          {u.role === 'admin' ? t.admin.setUser : t.admin.setAdmin}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
